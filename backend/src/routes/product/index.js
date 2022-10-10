const productController = require("../../controllers/productController");
const mainHandler = require("../../handlers/errorHandlers");
const express = require("express");
const { PRODUCT_SCHEMA } = require("../../validations/product");
const fileUpload = require("../../middleware/fileUpload");

const router = express.Router();

const authRoutes = (app) => {
  /**
   * Add Product
   */
  router.post(
    "/add",
    fileUpload.single("image"),
    PRODUCT_SCHEMA.ADD_PRODUCT,
    mainHandler.catchErrors(productController.addProduct)
  );
  /**
   * Edit Product
   */
  router.put(
    "/edit/:id",
    fileUpload.single("image"),
    PRODUCT_SCHEMA.ADD_PRODUCT,
    mainHandler.catchErrors(productController.editProduct)
  );
  /**
   * List Product
   */
  router.get(
    "/list",
    mainHandler.catchErrors(productController.listProduct)
  );
  /**
   * Delete Product by ID
   */
  router.delete(
    "/:id",
    mainHandler.catchErrors(productController.deleteProductDetails)
  );
	
  app.use("/api/product", router);
};

module.exports = authRoutes;
