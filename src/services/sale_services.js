// import models
import models from '../models/index.js';

// import StockHelper
import { incrementStock, reduceStock } from '../helpers/handle_stock.js';

export default {
  /**
   * Return all Sales
   * @param {*} find
   * @returns
   */
  getAllSale: async (find) => {
    const value = find;
    const result = await models.sale
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
   * Return one Sale
   * @param {*} SaleId
   * @returns
   */
  getSale: async (SaleId) => {
    const result = await models.sale
      .findById(SaleId)
      // Populate nos permite buscar referencias en otras colecciones
      .populate('user', { name: 1 }) // en este caso buscando en la coleccion user , el nombre de ese Receipt
      .populate('person', { name: 1 }); // en este caso buscando en la coleccion person , el nombre de ese Receipt;
    return result;
  },
  /**
   * Return Sale Created
   * @param {*} sale
   * @returns
   */
  createSale: async (sale) => {
    const newSale = await models.sale.create(sale);
    // Actualizar Stock
    const details = newSale.details;
    details.forEach((item) => {
      reduceStock(item._id, item.total_article);
    });
    return newSale;
  },

  /**
   * Return Enable one Sale
   * @param {*} SaleId
   * @param {*} sale
   * @returns
   */
  enableSale: async (SaleId, sale) => {
    const result = await models.sale.findByIdAndUpdate(
      SaleId,
      {
        status: sale.status
      },
      { new: true }
    );
    // Actualizar Stock
    const details = result.details;
    details.forEach((item) => {
      reduceStock(item._id, item.total_article);
    });
    return result;
  },
  /**
   * Return Disable one Sale
   * @param {*} SaleId
   * @param {*} receipt
   * @returns
   */
  disableSale: async (SaleId, sale) => {
    const result = await models.sale.findByIdAndUpdate(
      SaleId,
      {
        status: sale.status
      },
      { new: true }
    );
    // Actualizamos el stock
    // Recorremos cada unos de los objetos
    const details = result.details;
    details.forEach((item) => {
      incrementStock(item._id, item.total_article);
    });
    return result;
  },
  /**
   *  Return Graph 12 month ago
   * @returns
   */
  getGraph12Months: async () => {
    const result = await models.sale
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
   *  Return Ranges Sales
   * @param {*} dates
   * @returns
   */
  getCheckDates: async (dates) => {
    console.log('llegue aca');
    const start = dates.start;
    const end = dates.end;

    const result = await models.sale
      .find({
        created_at: { $gte: start, $lte: end }
      })
      .populate('user', { name: 1 }) // en este caso buscando en la coleccion user , el nombre de ese Income
      .populate('person', { name: 1 }) // en este caso buscando en la coleccion person , el nombre de ese Income;
      .sort({
        created_at: -1
      });

    return result;
  }
};
