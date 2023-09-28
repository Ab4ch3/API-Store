// Import Debug
import debug from "debug";
const logger = debug("app:module-receiptController");
// Import handlehttpErrors
import httpErrors from "../helpers/handleErrors.js";
// Import Services
import receiptServices from "../services/receiptServices.js";

/**
 * Get All Receipt
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllReceipt = async (req, res, next) => {
  const {
    query: { find },
  } = req;
  try {
    const allReceipt = await receiptServices.getAllReceipt(find);
    res.status(200).json({
      status: "OK",
      data: allReceipt,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_GET_RECEIPTS");
    next(e);
  }
};
/**
 * Get One Receipt
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getReceipt = async (req, res, next) => {
  try {
    const {
      params: { ReceiptId },
    } = req;
    const receipt = await receiptServices.getReceipt(ReceiptId);
    if (!receipt) {
      httpErrors(res, "NOT_FOUND", 404);
    } else {
      res.status(200).json({
        status: "OK",
        data: receipt,
      });
    }
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_GET_RECEIPT");
    next(e);
  }
};

/**
 * Create Receipt
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createReceipt = async (req, res, next) => {
  try {
    const { body } = req;
    const createdReceipt = await receiptServices.createReceipt(body);
    res.status(200).json({
      status: "OK",
      message: "RECEIPT_CREATED",
      data: createdReceipt,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_CREATED_RECEIPT");
    next(e);
  }
};

/**
 * Enable Receipt
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const enableReceipt = async (req, res, next) => {
  try {
    const {
      params: { ReceiptId },
    } = req;
    const { body } = req;
    const enabledReceipt = await receiptServices.enableReceipt(ReceiptId, body);
    if (!enabledReceipt) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "RECEIPT_ENABLED",
      data: enabledReceipt,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_ENABLED_RECEIPT");
    next(e);
  }
};

/**
 * disable Receipt;e
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const disableReceipt = async (req, res, next) => {
  try {
    const {
      params: { ReceiptId },
    } = req;
    const { body } = req;
    const disabledReceipt = await receiptServices.disableReceipt(
      ReceiptId,
      body
    );
    if (!disabledReceipt) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "RECEIPT_DISABLED",
      data: disabledReceipt,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_DISABLED_RECEIPT");
    next(e);
  }
};

export {
  getAllReceipt,
  getReceipt,
  createReceipt,
  enableReceipt,
  disableReceipt,
};