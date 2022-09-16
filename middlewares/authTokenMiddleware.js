const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res
        .status(401)
        .json({ message: 'Token not found' });
    }
    const decodeUser = jwt.verify(authorization, process.env.JWT_SECRET);
    req.user = decodeUser;
    next();
  } catch (error) {
    next({ status: 401, message: 'Expired or invalid token' });    
  }
};
module.exports = authToken;