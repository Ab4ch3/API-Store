// import models
import models from "../models/index.js";

const incrementStock = async (ArticleId, quantity) => {
  let { stock } = await models.article.findOne({ _id: ArticleId });
  let nStock = parseInt(stock) + parseInt(quantity);
  const result = await models.article.findByIdAndUpdate(
    { _id: ArticleId },
    { stock: nStock }
  );
};

const reduceStock = async (ArticleId, quantity) => {
  let { stock } = await models.article.findOne({ _id: ArticleId });
  let nStock = parseInt(stock) - parseInt(quantity);
  const result = await models.article.findByIdAndUpdate(
    { _id: ArticleId },
    { stock: nStock }
  );
};

export default {
  /**
   * Return all Receipt
   * @param {*} find
   * @returns
   */
  getAllReceipt: async (find) => {
    let value = find;
    let result = await models.receipt
      .find(
        {
          $or: [
            { voucher_num: new RegExp(value, "i") },
            { voucher_series: new RegExp(value, "i") },
          ],
        },
        { created_at: 0 }
      )
      .populate("user", { name: 1 }) //en este caso buscando en la coleccion user , el nombre de ese Income
      .populate("person", { name: 1 }) //en este caso buscando en la coleccion person , el nombre de ese Income;
      .sort({ created_at: -1 });
    return result;
  },
  /**
   * Return one Receipt
   * @param {*} ReceiptId
   * @returns
   */
  getReceipt: async (ReceiptId) => {
    let result = await models.receipt
      .findById(ReceiptId)
      //Populate nos permite buscar referencias en otras colecciones
      .populate("user", { name: 1 }) //en este caso buscando en la coleccion user , el nombre de ese Receipt
      .populate("person", { name: 1 }); //en este caso buscando en la coleccion person , el nombre de ese Receipt;
    return result;
  },
  /**
   * Return Receipt Created
   * @param {*} receipt
   * @returns
   */
  createReceipt: async (receipt) => {
    let newReceipt = await models.receipt.create(receipt);
    // Actualizar Stock
    let details = newReceipt.details;
    details.map((item) => {
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
    let result = await models.receipt.findByIdAndUpdate(
      ReceiptId,
      {
        status: receipt.status,
      },
      { new: true }
    );
    // Actualizar Stock
    let details = result.details;
    details.map((item) => {
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
    let result = await models.receipt.findByIdAndUpdate(
      ReceiptId,
      {
        status: receipt.status,
      },
      { new: true }
    );
    //Actualizamos el stock
    //Recorremos cada unos de los objetos
    let details = result.details;
    details.map((item) => {
      reduceStock(item._id, item.total_article);
    });
    return result;
  },
};
