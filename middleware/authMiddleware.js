import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(403).json({status: false, msg:'Authentication Invalid'});
  try {
    const data = verifyJWT(token);
    req.user = data;
    console.log(req.userId)
    next();
  } catch (error) {
    return res.status(403).json({status: false, msg:'No user ID found in token'});
  }
};
