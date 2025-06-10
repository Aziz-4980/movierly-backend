// Logger middleware to log request details
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next(); // Don't forget to call next() to pass control to the next middleware
};

module.exports = logger;
