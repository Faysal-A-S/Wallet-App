import mongoose from "mongoose";
const transactionSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reference: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Transaction = mongoose.model("Transactions", transactionSchema);
export default Transaction;
