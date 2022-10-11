const Product = require("../models/product.model");
const constants = require("../utils/constants");
const fs = require("fs");
const { ObjectId } = require("mongodb");

class productController {
  /**
   * Add Product API
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async addProduct(req, res) {
    try {
      const data = req.body;
      const file = req.file;
      // collecting all data for insertion in database
      const finalData = {
        product_name: data["product_name"],
        description: data["description"],
        price: data["price"],
        quantity: data["quantity"],
        status: data["status"],
        image: file?.filename ?? "",
      };

      await Product.create(finalData);

      res.json({
        status: 201,
        message: "Product has added successfully",
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Edit by Product API
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async editProduct(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const file = req.file;

      let productExists = await Product.findOne({
        _id: ObjectId(id),
      });

      if (!productExists) {
        throw "Product not found";
      }

      if (file && file.filename !== undefined) {
        try {
          await fs.unlinkSync(constants.image_path + productExists.image);
        } catch (e) {
          throw "Failed to delete the image";
        }
      }

      const finalData = {
        product_name: data["product_name"],
        description: data["description"],
        price: data["price"],
        quantity: data["quantity"],
        status: data["status"],
        image: file?.filename ?? productExists.image,
      };

      await Product.updateOne(
        {
          _id: ObjectId(id),
        },
        {
          $set: finalData,
        }
      );

      res.json({
        status: 200,
        message: "Product has updated successfully",
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * View  Product List API
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async listProduct(req, res) {
    try {
      const filterData = req.query;
      let filter_match = [];

      if (filterData["search"]) {
        const searchQuery = filterData["search"].trim();

        filter_match.push({
          $or: [
            { product_name: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } },
          ],
        });
      }
      const page =
        filterData["pageNo"] && filterData["pageNo"] > 0
          ? parseInt(filterData["pageNo"])
          : 1; // 1 is default page number
      const limit =
        filterData["limit"] && filterData["limit"] > 0
          ? parseInt(filterData["limit"])
          : 10; // 10 is default pagination record limit

      let facetQuery;
      facetQuery = {
        metadata: [
          { $count: "count" },
          { $addFields: { currentPage: page, limit: limit } },
        ],
        rows: [{ $sort: { created_at: -1 } }],
      };

      if (filterData["pageNo"] && filterData["limit"]) {
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
      }
      if (filterData["status"]) {
        const status = filterData["status"];
        filter_match = { status: status };
      }

      if (filterData["orderBy"]) {
        const orderBy = filterData["orderBy"] > 0 ? -1 : 1; // -1 for desc order max to min, and 1 is vice versa
        facetQuery = {
          rows: [
            { $sort: { price: orderBy } },
            { $skip: skip },
            { $limit: limit },
          ],
        };
      }

      filter_match.push({
        deleted_at: null,
      });

      const products = await Product.aggregate([
        {
          $match: { $and: filter_match },
        },
        {
          $project: {
            _id: 1,
            product_name: 1,
            description: 1,
            price: 1,
            quantity: 1,
            status: 1,
            image: 1,
            created_at: 1,
          },
        },
        {
          $facet: facetQuery,
        },
      ]);
      const productsData = products[0];

      productsData.currentPage =
        productsData.metadata[0]?.currentPage ?? constants.pageNo;
      productsData.limit = productsData.metadata[0]?.limit ?? limit;
      productsData.count = productsData.metadata[0]?.count ?? 0;
      productsData.totalPage = Math.ceil(
        productsData.count / productsData.limit
      );

      delete productsData.metadata;
      res.json({
        status: 200,
        data: productsData,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete Product Details
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async deleteProductDetails(req, res) {
    try {
      const id = req.params.id;
      let productExists = await Product.findOne({
        _id: ObjectId(id),
      });
      if (!productExists) {
        throw "Product Doesn't Exists";
      }
      //delete Product image
      try {
        await fs.unlinkSync(constants.product_path + productExists.image);
      } catch (e) {
        throw "Failed to delete the image";
      }
      await Product.deleteOne({
        _id: id,
      });

      res.json({
        status: 200,
        message: "Product deleted successfully",
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * View Product API
   * @param {Object} req Request
   * @param {Object} res Response
   * @response JsonObject
   */
  static async viewProduct(req, res) {
    try {
      const id = req.params.id;
      if (id) {
        const productExists = await Product.findOne(
          {
            _id: ObjectId(id),
          },
          {
            _id: 1,
            product_name: 1,
            description: 1,
            price: 1,
            quantity: 1,
            status: 1,
            image: 1,
            created_at: 1,
          }
        );

        if (!productExists) {
          throw "Product not found";
        }

        res.json({
          status: 200,
          message: "Product data get successfully",
          data: productExists,
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = productController;
