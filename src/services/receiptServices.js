// import models
import models from '../models/index.js';

// import StockHelper
import { incrementStock, reduceStock } from '../helpers/handleStock.js';

export default {
  /**
   * Return all Receipt
   * @param {*} find
   * @returns
   */
  getAllReceipt: async (find) => {
    const value = find;
    const result = await models.receipt
      .find({
        $or: [
          { voucher_num: new RegExp(value, 'i') },
          { voucher_series: new RegExp(value, 'i') }
        ]
      })
      .populate('user', { name: 1 }) // en este caso buscando en la coleccion user , el nombre de ese Income
      .populate('person', { name: 1 }) // en este caso buscando en la coleccion person , el nombre de ese Income;
      .sort({ created_at: -1 });
    return result;
  },
  /**
   * Return one Receipt
   * @param {*} ReceiptId
   * @returns
   */
  getReceipt: async (ReceiptId) => {
    const result = await models.receipt
      .findById(ReceiptId)
      // Populate nos permite buscar referencias en otras colecciones
      .populate('user', { name: 1 }) // en este caso buscando en la coleccion user , el nombre de ese Receipt
      .populate('person', { name: 1 }); // en este caso buscando en la coleccion person , el nombre de ese Receipt;
    return result;
  },
  /**
   * Return Receipt Created
   * @param {*} receipt
   * @returns
   */
  createReceipt: async (receipt) => {
    const newReceipt = await models.receipt.create(receipt);
    // Actualizar Stock
    const details = newReceipt.details;
    details.forEach((item) => {
      incrementStock(item._id, item.total_article);
    });
    return newReceipt;
  },

  /**
   * Return Enable one Receipt
   * @param {*} ReceiptId
   * @param {*} receipt
   * @returns
   */
  enableReceipt: async (ReceiptId, receipt) => {
    const result = await models.receipt.findByIdAndUpdate(
      ReceiptId,
      {
        status: receipt.status
      },
      { new: true }
    );
    // Actualizar Stock
    const details = result.details;
    details.forEach((item) => {
      incrementStock(item._id, item.total_article);
    });
    return result;
  },
  /**
   * Return Disable one Receipt
   * @param {*} ReceiptId
   * @param {*} receipt
   * @returns
   */
  disableReceipt: async (ReceiptId, receipt) => {
    const result = await models.receipt.findByIdAndUpdate(
      ReceiptId,
      {
        status: receipt.status
      },
      { new: true }
    );
    // Actualizamos el stock
    // Recorremos cada unos de los objetos
    const details = result.details;
    details.forEach((item) => {
      reduceStock(item._id, item.total_article);
    });
    return result;
  },
  /**
   *  Return Graph 12 month ago
   * @returns
   */
  getGraph12Months: async () => {
    const result = await models.receipt
      .aggregate([
        {
          $group: {
            _id: {
              month: { $month: '$created_at' },
              year: { $year: '$created_at' }
            },
            total: {
              $sum: '$total'
            },
            number: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            '_id.year': -1,
            '_id.month': -1
          }
        }
      ])
      .limit(12);

    return result;
  },

  /**
   *  Return Ranges receipt
   * @param {*} dates
   * @returns
   */
  getCheckDates: async (dates) => {
    const start = dates.start;
    const end = dates.end;

    const result = await models.receipt
      .find({
        created_at: { $gte: start, $lt: end }
      })
      .populate('user', { name: 1 }) // en este caso buscando en la coleccion user , el nombre de ese Income
      .populate('person', { name: 1 }) // en este caso buscando en la coleccion person , el nombre de ese Income;
      .sort({
        created_at: -1
      });

    return result;
  }
};
