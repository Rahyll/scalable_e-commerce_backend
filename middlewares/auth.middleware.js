import jwt from "jsonwebtoken";

const authenticator = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied" });
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(401).json({ message: "Invalid access token" });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { authenticator };
