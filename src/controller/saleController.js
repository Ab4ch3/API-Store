// Import Debug
import debug from "debug";
const logger = debug("app:module-saleController");
// Import handlehttpErrors
import httpErrors from "../helpers/handleErrors.js";
// Import Services
import saleServices from "../services/saleServices.js";

/**
 * Get All Sale
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllSale = async (req, res, next) => {
  const {
    query: { find },
  } = req;
  try {
    const allSales = await saleServices.getAllSale(find);
    res.status(200).json({
      status: "OK",
      data: allSales,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_GET_SALES");
    next(e);
  }
};
/**
 * Get One Sale
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getSale = async (req, res, next) => {
  try {
    const {
      params: { SaleId },
    } = req;
    const sale = await saleServices.getSale(SaleId);
    if (!sale) {
      httpErrors(res, "NOT_FOUND", 404);
    } else {
      res.status(200).json({
        status: "OK",
        data: sale,
      });
    }
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_GET_SALE");
    next(e);
  }
};

/**
 * Create Sales
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createSale = async (req, res, next) => {
  try {
    const { body } = req;
    const createdSale = await saleServices.createSale(body);
    res.status(200).json({
      status: "OK",
      message: "SALE_CREATED",
      data: createdSale,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_CREATED_SALE");
    next(e);
  }
};

/**
 * Enable Sale
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const enableSale = async (req, res, next) => {
  try {
    const {
      params: { SaleId },
    } = req;
    const { body } = req;
    const enabledSale = await saleServices.enableSale(SaleId, body);
    if (!enabledSale) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "SALE_ENABLED",
      data: enabledSale,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_ENABLED_SALE");
    next(e);
  }
};

/**
 * disable Sale
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const disableSale = async (req, res, next) => {
  try {
    const {
      params: { SaleId },
    } = req;
    const { body } = req;
    const disabledSale = await saleServices.disableSale(SaleId, body);
    if (!disabledSale) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "SALE_DISABLED",
      data: disabledSale,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_DISABLED_SALE");
    next(e);
  }
};

export { getAllSale, getSale, createSale, enableSale, disableSale };
