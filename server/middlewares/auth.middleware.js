import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;

  //  return res.json(token)

  if (!token) {
    return res.status(401).json({ success:false,message: 'No token provided' });
  }

  const Secret_Key = process.env.SECRET;

  try {
    const decoded = jwt.verify(token, Secret_Key);
    req.user = decoded;  // Attach decoded payload to request object
    return res.json({
      success:true,
      user: decoded,
      message: "your have valid token for auto log"
    })
    // next();              // Call next middleware/route handler
  } catch (err) {
    return res.status(401).json({success:false , message: 'Invalid or expired token' });
  }
};
