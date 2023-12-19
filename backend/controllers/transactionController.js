import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import { v4 as uuid } from "uuid";

import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OG5bkHIHwz3i9g3jcw5Ca92h4qXtrSexVB55wGM56lX6Ykk12ci5ADHYaI7b5Iv7YVA05lAv0xUorbvEEMOskSu001zLO6fQn"
);

export const transferFund = async (req, res) => {
  const { amount, accNumber, reference, userId } = req.body;
  try {
    await User.findByIdAndUpdate(userId, {
      $inc: { balance: -parseInt(amount) },
    });
    await User.findByIdAndUpdate(accNumber, {
      $inc: { balance: parseInt(amount) },
    });
    const newTransaction = await Transaction({
      amount,
      sender: userId,
      receiver: accNumber,

      reference,
    });
    await newTransaction.save();
    return res.status(200).json({ message: "Fund transfered Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const transactionByUser = async (req, res) => {
  const id = req.body.userId;

  try {
    const transactions = await Transaction.find({
      $or: [{ sender: id }, { receiver: id }],
    }).sort({ createdAt: -1 });

    return res.status(200).json({ data: transactions });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const depositFunds = async (req, res) => {
  const { data, amount } = req.body;
  let pamount = parseInt(amount);
  const id = req.body.userId;

  try {
    const customer = await stripe.customers.create({
      email: data.email,
      source: data.id,
    });

    const charge = await stripe.charges.create(
      {
        amount: pamount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: data.email,
        description: "Deposited to wallet app",
      },
      {
        idempotencyKey: uuid(),
      }
    );

    if (charge.status === "succeeded") {
      const transaction = await Transaction({
        amount: pamount,
        sender: id,
        receiver: id,
        reference: "Added through stripe",
      });
      await transaction.save();
      await User.findByIdAndUpdate(id, {
        $inc: { balance: pamount },
      });
      return res.status(200).json({ message: "transaction successful" });
    } else {
      return res.status(500).json({ message: "transaction failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
