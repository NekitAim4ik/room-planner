const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Токен будет в куке, которую мы сами установим при логине
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};