const productController = require("../../controllers/productController");
const mainHandler = require("../../handlers/errorHandlers");
const express = require("express");
const { PRODUCT_SCHEMA } = require("../../validations/product");
const fileUpload = require("../../middleware/fileUpload");
const { isAuth } = require("../../middleware/isAuth");

const router = express.Router();

const authRoutes = (app) => {
  /**
   * Add Product
   */
  router.post(
    "/add",
    isAuth,
    fileUpload.single("image"),
    PRODUCT_SCHEMA.ADD_PRODUCT,
    mainHandler.catchErrors(productController.addProduct)
  );
  /**
   * Edit Product
   */
  router.put(
    "/edit/:id",
    isAuth,
    fileUpload.single("image"),
    PRODUCT_SCHEMA.ADD_PRODUCT,
    mainHandler.catchErrors(productController.editProduct)
  );
  /**
   * List Product
   */
  router.get(
    "/list",
    isAuth,
    mainHandler.catchErrors(productController.listProduct)
  );
  /**
   * Delete Product by ID
   */
  router.delete(
    "/:id",
    isAuth,
    mainHandler.catchErrors(productController.deleteProductDetails)
  );

  /**
   * Product Details by Id
   */
  router.get("/:id", mainHandler.catchErrors(productController.viewProduct));

  app.use("/api/product", router);
};

module.exports = authRoutes;
