import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
