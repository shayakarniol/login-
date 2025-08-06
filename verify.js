import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || "supersecret";

export default function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ valid: true, user: decoded });
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
}