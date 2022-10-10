const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  /**
   * Server port, Default is 5000
   */
  port: process.env.PORT || 5000,

  /**
   * Mongo DB connection URI.
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY,
  SALT: process.env.SALT,

  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },

  /**
   * User Type
   */
  userType: {
    admin: 1,
    user: 2,
  },

  profile_path: process.env.PROFILE_PATH,
  product_path: process.env.PRODUCT_PATH,

  fileSizeLimit: 5, // 5 MB
  limitForList: 10, // Default record list for pagination
  pageNo: 1, // Default pagination page number
};
