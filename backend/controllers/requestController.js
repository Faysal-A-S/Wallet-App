import { Request } from "../models/RequestModel.js";
import User from "./../models/userModel.js";
import Transaction from "./../models/transactionModel.js";

export const getRequestsByUser = async (req, res) => {
  try {
    const requests = await Request.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    })
      .populate("sender", "email")
      .populate("receiver", "email")
      .sort({ createdAt: -1 });

    if (requests.length > 0) {
      return res.status(200).json({ message: requests });
    } else {
      return res.status(404).json({ message: "No requests found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const sendRequest = async (req, res) => {
  try {
    const { receiver, amount, reference, userId } = req.body;

    const newRequest = await Request({
      sender: userId,
      receiver,
      amount,
      reference,
    });
    await newRequest.save();
    return res.status(200).json({ message: "request saved successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateRequest = async (req, res) => {
  const { status, data } = req.body;

  try {
    const mSender = await User.findOne(
      { _id: req.body.userId },
      { balance: 1 }
    );

    if (status === "Accepted") {
      if (mSender.balance < data.amount) {
        return res.status(500).json({ message: "Insuffficient balance" });
      }
      //sender
      await User.findByIdAndUpdate(data.receiver._id, {
        $inc: { balance: -data.amount },
      });
      //receiver
      await User.findByIdAndUpdate(data.sender._id, {
        $inc: { balance: data.amount },
      });

      const transaction = await Transaction({
        amount: data.amount,
        sender: data.receiver._id,
        receiver: data.sender._id,
        reference: data.reference,
      });
      await transaction.save();
    }

    await Request.findByIdAndUpdate(data._id, { status });
    return res.status(200).json({ message: "Status Updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
