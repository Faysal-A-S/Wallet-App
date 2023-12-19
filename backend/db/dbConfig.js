import mongoose from "mongoose";
export const Connection = async (user, pass) => {
  const url = `mongodb+srv://${user}:${pass}@user-management.5unjowv.mongodb.net/WalletApp`;
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (err) {
    console.log(err);
  }
};
