const jwt = require('jsonwebtoken');
const userDb = require('../Models/authModel');


const authMiddleware = async (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  // Remove 'Bearer' prefix and trim the token
  const jwtToken = token.replace('Bearer', '').trim();

  try {
    // Verify the JWT token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    
    // Find the user by email, excluding the password field
    const userData = await userDb.findOne({ email: isVerified.email }).select({ password: 0 });
    
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user data to the request object for further use
    req.user = userData;

    // console.log(userData, "Authenticated user data");
    
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Auth Middleware Error: ", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authMiddleware };




module.exports ={ authMiddleware};