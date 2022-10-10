const auth = require("../../controllers/authController");
const mainHandler = require("../../handlers/errorHandlers");
const express = require("express");
const { ADMIN_SCHEMAS } = require("../../validations/admin");

const router = express.Router();

const authRoutes = (app) => {
  /**
   * Seed Admin
   */
  router.post(
    "/signup",
    ADMIN_SCHEMAS.SIGNUP,
    mainHandler.catchErrors(auth.signUp)
  );

  /**
   * Login Admin
   */
  router.post(
    "/login",
    ADMIN_SCHEMAS.LOGIN,
    mainHandler.catchErrors(auth.login)
  );
  router.delete("/logout", mainHandler.catchErrors(auth.logout));

  app.use("/api/auth", router);
};

module.exports = authRoutes;
