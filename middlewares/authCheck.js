import jwt from 'jsonwebtoken';



export const authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  const decode = jwt.decode(token, process.env.SECRET);
  if (!decode) return res.status(401).json({ message: 'unauthorized' });
  req.userId = decode.userId;
  console.log(decode)
  req.role = decode.role;
  next();
}
export const adminCheck = (req, res, next) => {
  if (req.role !== 'admin') return res.status(401).json({ message: 'unauthorized' });
  next();
}