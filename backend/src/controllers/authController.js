const User = require("../models/user.model");
const constants = require("../utils/constants");
const sha256 = require("sha256");
const helper = require("../helpers");
const { Container } = require("typedi");

class userController {
  /**
   * Admin registration API
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async signUp(req, res) {
    try {
      const data = req.body;
      
      let userExists = await User.findOne({
        email: data["email"],
      });

      if (userExists) {
        throw "This email address is already registered";
      }

      // Hashing the password
      let hashPassword = sha256(data["password"] + constants.SALT);

      await User.create({
        full_name: data["full_name"],
        email: data["email"],
        password: hashPassword,
        type: data["type"],
        token: "",
      });
	  
      res.json({
        status: 201,
        message: "Admin created successfully",
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Admin Log API
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async login(req, res) {
    try {
      const data = req.body;

      let userExists = await User.findOne({
        email: data["email"],
      });

      if (!userExists) {
        throw "User doesn't Exists with this email";
      }

      let hashPassword = sha256(data["password"] + constants.SALT);

      // Generating the JWT token
      const token = await helper.generateToken(userExists);

      if (hashPassword != userExists.password) {
        res.status(401).json({
          status: 401,
          message: "Invalid Credentials",
        });
      } else {
        await User.updateOne(
          {
            email: data["email"],
          },
          {
            $set: {
              token: token,
            },
          }
        );
      }

      res.json({
        status: 200,
        message: "Successfully Login",
        data: {
          token: token,
          full_name: userExists["full_name"],
          email: data["email"],
          type: userExists["type"],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Admin Log Out API
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async logout(req, res) {
    try {
		const userData = Container.get("auth-user");

      let userExists = await User.findOne({
        email: userData["email"]
      });

      /**
       * remove token from database
       */
      await User.updateOne(
        {
          email: userExists["email"],
        },
        {
          $set: {
            token: "",
          },
        }
      );
		await Container.remove('auth-user');

      res.json({
        status: 200,
        message: "Successfully Logout",
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = userController;
