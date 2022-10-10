const jwt = require("jwt-then");
const constants = require("../utils/constants");

class helper {
  /**
   * generate jwt token
   * @param {Object} userData users data
   * @returns {string} token
   */
  static async generateToken(userData) {
    try {
      const data = await jwt.sign(
        {
          id: userData["_id"],
        },
        constants.jwtSecret,
        {
          expiresIn: constants.jwtExpiry,
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = helper;
