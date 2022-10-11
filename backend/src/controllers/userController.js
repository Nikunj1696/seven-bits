const User = require("../models/user.model");
const constants = require("../utils/constants");
const sha256 = require("sha256");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const { Container } = require("typedi");

class userController {
  /**
   * Add User API
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async addUser(req, res) {
    try {
      const data = req.body;
      const file = req.file;

      let userExists = await User.findOne({
        email: data["email"],
      });

      if (userExists) {
        throw "This email address is already registered";
      }

      // Hashing the password
      let hashPassword = sha256(data["password"] + constants.SALT);

      // collecting all data for insertion in database
      const finalData = {
        full_name: data["full_name"],
        email: data["email"],
        password: hashPassword,
        type: data["type"],
        token: "",
        profile: file?.filename ?? "",
      };

      await User.create(finalData);

      res.json({
        status: 201,
        message: "User has added successfully",
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Edit by Admin API
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async editUser(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const file = req.file;

      let userExists = await User.findOne({
        _id: ObjectId(id),
      });

      if (!userExists) {
        throw "User not found";
      }
      if (file && file.filename !== undefined) {
        try {
          await fs.unlinkSync(constants.profile_path + userExists.profile);
        } catch (e) {
          throw "Failed to delete the profile";
        }
      }

      const finalData = {
        full_name: data["full_name"],
        profile: file?.filename ?? "",
      };

      await User.updateOne(
        {
          _id: ObjectId(id),
        },
        {
          $set: finalData,
        }
      );

      res.json({
        status: 200,
        message: "User has updated successfully",
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * View by Admin API
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async viewUser(req, res) {
    try {
      const id = req.params.id;

      let userExists = await User.findOne(
        {
          _id: ObjectId(id),
          type: constants.userType.user,
        },
        {
          _id: 1,
          full_name: 1,
          type: 1,
          email: 1,
          profile: 1,
          created_at: 1,
        }
      );

      if (!userExists) {
        throw "User not found";
      }

      res.json({
        status: 200,
        message: "User data get successfully",
        data: userExists,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * View List by Admin API
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async listUser(req, res) {
    try {
      const filterData = req.query;
      /**
       * Getting Only user type data not admin
       */
      const filter_match = [
        {
          type: constants.userType.user,
        },
      ];

      if (filterData["search"]) {
        // trimming the query
        const searchQuery = filterData["search"].trim();
        filter_match.push({
          $or: [
            { full_name: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
          ],
        });
      }
      filter_match.push({
        deleted_at: null,
      });

      let facetQuery;
      let limit = constants.limitForList;

      if (filterData["pageNo"] && filterData["limit"]) {
        // Default pagination page no 1
        const page =
          filterData["pageNo"] && filterData["pageNo"] > 0
            ? parseInt(filterData["pageNo"])
            : constants.pageNo;
        // Default pagination per page record 10
        limit =
          filterData["limit"] && filterData["limit"] > 0
            ? parseInt(filterData["limit"])
            : constants.limitForList;

        const skip = (page - 1) * limit;

        facetQuery = {
          metadata: [
            { $count: "count" },
            { $addFields: { currentPage: page, limit: limit } },
          ],
          rows: [
            { $sort: { created_at: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
        };
      } else {
        facetQuery = {
          metadata: [
            { $count: "count" },
            {
              $addFields: {
                currentPage: constants.pageNo,
                limit: constants.limitForList,
              },
            },
          ],
          rows: [{ $sort: { created_at: -1 } }],
        };
      }
      const users = await User.aggregate([
        {
          $match: { $and: filter_match },
        },
        {
          $project: {
            _id: 1,
            full_name: 1,
            email: 1,
            profile: 1,
            created_at: 1,
          },
        },
        {
          $facet: facetQuery,
        },
      ]);

      const userData = users[0];

      userData.currentPage =
        userData.metadata[0]?.currentPage ?? constants.pageNo;
      userData.limit = userData.metadata[0]?.limit ?? limit;
      userData.count = userData.metadata[0]?.count ?? 0;
      userData.totalPage = Math.ceil(userData.count / userData.limit);
      delete userData.metadata;

      res.json({
        status: 200,
        message: "Users data get success",
        data: userData,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete User Details
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async deleteUserDetails(req, res) {
    try {
      const id = req.params.id;
      let userExists = await User.findOne({
        _id: ObjectId(id),
      });
      if (!userExists) {
        throw "User Doesn't Exists";
      }
      //delete User profile
      try {
        if (userExists.profile) {
          await fs.unlinkSync(constants.profile_path + userExists.profile);
        }
      } catch (e) {
        throw "Failed to delete the profile";
      }
      await User.deleteOne({
        _id: id,
      });

      res.json({
        status: 200,
        message: "User deleted successfully",
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Store Public address of Metamask
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async storeMetamaskDetails(req, res) {
    try {
      const userData = Container.get("auth-user");

      if (!userData) {
        throw "User Doesn't Exists";
      }
		const finalData = {
			publicAddress : req.body.publicAddress
	  }
      const updatedData = await User.updateOne(
        {
          email: userData["email"],
        },
        {
          $set: finalData
        }
      );

		/** Generating 4 random digit ping */
      const pin = Math.random().toString().substr(2, 4);
      res.json({
        status: 200,
        message: "User updated successfully",
        data: {
          pin,
			userData,
			publicAddress: finalData.publicAddress
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = userController;
