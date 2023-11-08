// Import Debug
import debug from 'debug';
// Import handlehttpErrors
import httpErrors from '../helpers/handle_errors.js';
// Import Services
import receiptServices from '../services/receipt_services.js';
const logger = debug('app:module-receiptController');

/**
 * Get All Receipt
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllReceipt = async (req, res, next) => {
  const {
    query: { find }
  } = req;
  try {
    const allReceipt = await receiptServices.getAllReceipt(find);
    res.status(200).json({
      status: 'OK',
      data: allReceipt
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_GET_RECEIPTS');
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
      params: { ReceiptId }
    } = req;
    const receipt = await receiptServices.getReceipt(ReceiptId);
    if (!receipt) {
      httpErrors(res, 'NOT_FOUND', 404);
    } else {
      res.status(200).json({
        status: 'OK',
        data: receipt
      });
    }
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_GET_RECEIPT');
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
      status: 'OK',
      message: 'RECEIPT_CREATED',
      data: createdReceipt
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_CREATED_RECEIPT');
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
      params: { ReceiptId }
    } = req;
    const { body } = req;
    const enabledReceipt = await receiptServices.enableReceipt(ReceiptId, body);
    if (!enabledReceipt) {
      return httpErrors(res, 'NOT_FOUND', 404);
    }

    res.status(200).json({
      status: 'OK',
      message: 'RECEIPT_ENABLED',
      data: enabledReceipt
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_ENABLED_RECEIPT');
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
      params: { ReceiptId }
    } = req;
    const { body } = req;
    const disabledReceipt = await receiptServices.disableReceipt(
      ReceiptId,
      body
    );
    if (!disabledReceipt) {
      return httpErrors(res, 'NOT_FOUND', 404);
    }

    res.status(200).json({
      status: 'OK',
      message: 'RECEIPT_DISABLED',
      data: disabledReceipt
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_DISABLED_RECEIPT');
    next(e);
  }
};

/**
 * Get Graph 12months
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getGraph12Months = async (req, res, next) => {
  try {
    const { body } = req;
    const graphReceipts = await receiptServices.getGraph12Months(body);
    res.status(200).json({
      status: 'OK',
      message: 'RECEIPTS_GRAPH_12_MONTHS',
      data: graphReceipts
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_GET_GRAPH');
    next(e);
  }
};

/**
 * Get Ranges Receipt
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getCheckDates = async (req, res, next) => {
  const { body } = req;
  try {
    const allReceipt = await receiptServices.getCheckDates(body);
    res.status(200).json({
      status: 'OK',
      data: allReceipt
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_GET_RECEIPTS');
    next(e);
  }
};

export {
  getAllReceipt,
  getReceipt,
  createReceipt,
  enableReceipt,
  disableReceipt,
  getGraph12Months,
  getCheckDates
};
