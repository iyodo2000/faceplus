const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE_TOKEN);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

module.exports = auth;