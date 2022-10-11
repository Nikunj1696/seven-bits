const express = require("express");
const userController = require("../../controllers/userController");
const mainHandler = require("../../handlers/errorHandlers");
const { USER_SCHEMA } = require("../../validations/user");
const { isAuth } = require("../../middleware/isAuth");
const fileUpload = require("../../middleware/fileUpload");

const router = express.Router();

const authRoutes = (app) => {
  /**
   * Add User
   */
  router.post(
    "/add",
    isAuth,
    fileUpload.single("profile"),
    USER_SCHEMA.ADD_USER,
    mainHandler.catchErrors(userController.addUser)
  );
  /**
   * Edit User
   */
  router.put(
    "/edit/:id",
    isAuth,
    fileUpload.single("profile"),
    USER_SCHEMA.EDIT_USER,
    mainHandler.catchErrors(userController.editUser)
  );
  /**
   * List User
   */
  router.get("/list", isAuth, mainHandler.catchErrors(userController.listUser));
  /**
   * User Details by Id
   */
  router.get("/:id", isAuth, mainHandler.catchErrors(userController.viewUser));
  /**
   * Delete User by ID
   */
  router.delete(
    "/:id",
    isAuth,
    mainHandler.catchErrors(userController.deleteUserDetails)
  );

  /**
   * Store Metamask public address in our record
   */
  router.post(
    "/metamask",
    isAuth,
    mainHandler.catchErrors(userController.storeMetamaskDetails)
  );
  app.use("/api/user", router);
};

module.exports = authRoutes;
