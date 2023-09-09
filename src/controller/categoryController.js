// Import Debug
import debug from "debug";
const logger = debug("app:module-categoryController");
// Import handlehttpErrors
import httpErrors from "../helpers/handleErrors.js";
// Import Services
import categoryServices from "../services/categoryServices.js";
// Import Validator
import { matchedData } from "express-validator";

/**
 * Get All Categories
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllCategories = async (req, res, next) => {
  const {
    query: { find },
  } = req;
  try {
    const allCategories = await categoryServices.getAllCategories(find);
    res.status(200).json({
      status: "OK",
      data: allCategories,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_GET_CATEGORIES");
    next(e);
  }
};
/**
 * Get One Category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getCategory = async (req, res, next) => {
  try {
    const {
      params: { CategoryId },
    } = req;
    const category = await categoryServices.getCategory(CategoryId);
    if (!category) {
      httpErrors(res, "NOT_FOUND", 404);
    } else {
      res.status(200).json({
        status: "OK",
        data: category,
      });
    }
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_GET_CATEGORY");
    next(e);
  }
};

/**
 * Create Category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createCategory = async (req, res, next) => {
  try {
    const body = matchedData(req);
    const createdCategory = await categoryServices.createCategory(body);
    res.status(200).json({
      status: "OK",
      message: "CATEGORY_CREATED",
      data: createdCategory,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_CREATED_CATEGORY");
    next(e);
  }
};

/**
 * Update Category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateCategory = async (req, res, next) => {
  try {
    const {
      params: { CategoryId },
    } = req;
    const { body } = req;
    const updatedCategory = await categoryServices.updateCategory(
      CategoryId,
      body
    );
    if (!updatedCategory) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "CATEGORY_UPDATED",
      data: updatedCategory,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_UPDATED_CATEGORY");
    next(e);
  }
};

/**
 * Enable Category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const enableCategory = async (req, res, next) => {
  try {
    const {
      params: { CategoryId },
    } = req;
    const { body } = req;
    const enabledCategory = await categoryServices.enableCategory(
      CategoryId,
      body
    );
    if (!enabledCategory) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "CATEGORY_ENABLED",
      data: enabledCategory,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_ENABLED_CATEGORY");
    next(e);
  }
};

/**
 * disable Category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const disableCategory = async (req, res, next) => {
  try {
    const {
      params: { CategoryId },
    } = req;
    const { body } = req;
    const disabledCategory = await categoryServices.disableCategory(
      CategoryId,
      body
    );
    if (!disabledCategory) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "CATEGORY_DISABLED",
      data: disabledCategory,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_DISABLED_CATEGORY");
    next(e);
  }
};

/**
 * delete Category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteCategory = async (req, res, next) => {
  try {
    const {
      params: { CategoryId },
    } = req;
    const deletedCategory = await categoryServices.deleteCategory(CategoryId);
    if (!deletedCategory) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "CATEGORY_DELETED",
      data: deletedCategory,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_DELETED_CATEGORY");
    next(e);
  }
};

export {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  enableCategory,
  disableCategory,
  deleteCategory,
};
