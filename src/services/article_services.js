// import models
import models from '../models/index.js';

export default {
  /**
   * Return all articles
   * @param {*} find
   * @returns
   */
  getAllArticles: async (find) => {
    const value = find;
    const result = await models.article
      .find(
        {
          $or: [
            { name: new RegExp(value, 'i') },
            { description: new RegExp(value, 'i') }
          ]
        },
        { created_at: 0 }
      )
      /*
      Populate nos permite hacer referencias previamente hechas
      en el modelo, con el nombre del modelo a relacionar y el campo que quiero
      recibe el modelo a relacionar
      y el segundo el filtro en este caso solo el nombre
      */
      .populate('category', { name: 1 })
      .sort({ created_at: -1 });
    return result;
  },
  /**
   * Return one article
   * @param {*} ArticleId
   * @returns
   */
  getArticle: async (ArticleId) => {
    const result = await models.article
      .findById(ArticleId)
      .populate('category', { name: 1 });
    return result;
  },
  /**
   *get one article by codebar
   * @param {*} article
   * @returns
   */
  getArticleByBarCode: async (article) => {
    const result = await models.article
      .findOne({ code: article.code })
      .populate('category', { name: 1 });
    return result;
  },
  /**
   * Return Article Created
   * @param {*} article
   * @returns
   */
  createArticle: async (article) => {
    const result = await models.article.create(article);
    return result;
  },
  /**
   * Return Update one article
   * @param {*} ArticleId
   * @param {*} article
   * @returns
   */
  updateArticle: async (ArticleId, article) => {
    const result = await models.article.findByIdAndUpdate(
      ArticleId,
      {
        category: article.category,
        code: article.code,
        name: article.name,
        description: article.description,
        sell_price: article.sell_price,
        stock: article.stock
      },
      { new: true }
    );
    return result;
  },
  /**
   * Return Enable one article
   * @param {*} ArticleId
   * @param {*} article
   * @returns
   */
  enableArticle: async (ArticleId, article) => {
    const result = await models.article.findByIdAndUpdate(
      ArticleId,
      {
        status: article.status
      },
      { new: true }
    );
    return result;
  },
  /**
   * Return Disable one article
   * @param {*} ArticleId
   * @param {*} article
   * @returns
   */
  disableArticle: async (ArticleId, article) => {
    const result = await models.article.findByIdAndUpdate(
      ArticleId,
      {
        status: article.status
      },
      { new: true }
    );
    return result;
  },
  /**
   * Return Delete one article
   * @param {*} ArticleId
   * @returns
   */
  deleteArticle: async (ArticleId) => {
    const result = await models.article.findByIdAndDelete(ArticleId);

    return result;
  }
};
