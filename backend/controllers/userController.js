import generateToken from "../config/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { firstName, lastName, Email, password, phone } = req.body;

  try {
    let existingUser = await User.findOne({ email: Email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    } else {
      let hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User({
        first_name: firstName,
        last_name: lastName,
        email: Email,
        password: hashedPassword,
        phone,
      });
      await newUser.save();
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export const loginUser = async (req, res) => {
  const { Email, password } = req.body;

  try {
    let user = await User.findOne({ email: Email });

    if (user) {
      let isCorrectPassword = bcrypt.compareSync(password, user.password);
      if (isCorrectPassword) {
        return res.status(200).json({
          message: "user logged in successfully",
          token: generateToken(user._id),
          user: user.isVerified,
        });
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      return res.status(404).json({ message: "User doesn't exists" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId }).select(
      "-password"
    );
    return res
      .status(200)
      .json({ message: "user info fetched successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const verifyUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (id === req.body.userId) {
      return res.status(500).json({ message: "Invalid User!" });
    } else {
      const user = await User.findOne({ _id: id });
      if (user) {
        return res.status(200).json({ message: "User found successfully!" });
      } else {
        return res
          .status(404)
          .json({ message: "No user found with this Account Number!" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No user found with this Account Number!" });
  }
};

export const updateUser = async (req, res) => {
  const { firstName, lastName, phone, id } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      first_name: firstName,
      last_name: lastName,
      phone,
    });
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId }, { isVerified: 1 });
    if (user.isVerified) {
      const userList = await User.find(
        { _id: { $ne: userId } },
        {
          first_name: 1,
          last_name: 1,
          email: 1,
          phone: 1,
          isVerified: 1,
          balance: 1,
        }
      );

      return res.status(200).json({ message: userList });
    } else {
      return res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateUserStatus = async (req, res) => {
  const { data, action } = req.body;
  try {
    if (action === "Activate") {
      await User.findByIdAndUpdate(data, { isVerified: true });
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      await User.findByIdAndUpdate(data, { isVerified: false });
      return res.status(200).json({ message: "User updated successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
