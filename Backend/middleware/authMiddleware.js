// /middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Auth Middleware: Token decoded successfully for ID:', decoded.id);

      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        console.error('❌ Auth Middleware: User not found for ID:', decoded.id);
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('❌ Auth Middleware Error:', error.message);
      res.status(401);
      throw new Error('Not authorized, token failed: ' + error.message);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };