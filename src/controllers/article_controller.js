// Import Debug
import debug from 'debug';
// Import handlehttpErrors
import httpErrors from '../helpers/handle_errors.js';
// Import Services
import articleServices from '../services/article_services.js';
const logger = debug('app:module-articleController');

/**
 * Get All Articles
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllArticles = async (req, res, next) => {
  const {
    query: { find }
  } = req;
  try {
    const allArticles = await articleServices.getAllArticles(find);
    res.status(200).json({
      status: 'OK',
      data: allArticles
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_GET_ARTICLES');
    next(e);
  }
};
/**
 * Get One Article
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getArticle = async (req, res, next) => {
  try {
    const {
      params: { ArticleId }
    } = req;
    const article = await articleServices.getArticle(ArticleId);
    if (!article) {
      httpErrors(res, 'NOT_FOUND', 404);
    } else {
      res.status(200).json({
        status: 'OK',
        data: article
      });
    }
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_GET_ARTICLE');
    next(e);
  }
};

/**
 * Get article by Codebar
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getArticleByBarCode = async (req, res, next) => {
  try {
    const { body } = req;
    const article = await articleServices.getArticleByBarCode(body);
    if (!article) {
      res.status(404).send({
        message: 'Not Found'
      });
    } else {
      res.status(200).json({
        status: 'OK',
        data: article
      });
    }
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_GET_ARTICLE');
    next(e);
  }
};

/**
 * Create article
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createArticle = async (req, res, next) => {
  try {
    const { body } = req;
    const createdArticle = await articleServices.createArticle(body);
    res.status(200).json({
      status: 'OK',
      message: 'ARTICLE_CREATED',
      data: createdArticle
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_CREATED_ARTICLE');
    next(e);
  }
};

/**
 * Update Article
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateArticle = async (req, res, next) => {
  try {
    const {
      params: { ArticleId }
    } = req;
    const { body } = req;
    const updatedArticle = await articleServices.updateArticle(ArticleId, body);
    if (!updatedArticle) {
      return httpErrors(res, 'NOT_FOUND', 404);
    }

    res.status(200).json({
      status: 'OK',
      message: 'ARTICLE_UPDATED',
      data: updatedArticle
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_UPDATED_ARTICLE');
    next(e);
  }
};

/**
 * Enable Article
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const enableArticle = async (req, res, next) => {
  try {
    const {
      params: { ArticleId }
    } = req;
    const { body } = req;
    const enabledArticle = await articleServices.enableArticle(ArticleId, body);
    if (!enabledArticle) {
      return httpErrors(res, 'NOT_FOUND', 404);
    }

    res.status(200).json({
      status: 'OK',
      message: 'ARTICLE_ENABLED',
      data: enabledArticle
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_ENABLED_ARTICLE');
    next(e);
  }
};

/**
 * disable Artic;e
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const disableArticle = async (req, res, next) => {
  try {
    const {
      params: { ArticleId }
    } = req;
    const { body } = req;
    const disabledArticle = await articleServices.disableArticle(
      ArticleId,
      body
    );
    if (!disabledArticle) {
      return httpErrors(res, 'NOT_FOUND', 404);
    }

    res.status(200).json({
      status: 'OK',
      message: 'ARTICLE_DISABLED',
      data: disabledArticle
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_DISABLED_ARTICLE');
    next(e);
  }
};

/**
 * delete article
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteArticle = async (req, res, next) => {
  try {
    const {
      params: { ArticleId }
    } = req;
    const deletedArticle = await articleServices.deleteArticle(ArticleId);
    if (!deletedArticle) {
      return httpErrors(res, 'NOT_FOUND', 404);
    }

    res.status(200).json({
      status: 'OK',
      message: 'ARTICLE_DELETED',
      data: deletedArticle
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_DELETED_ARTICLE');
    next(e);
  }
};

export {
  getAllArticles,
  getArticle,
  getArticleByBarCode,
  createArticle,
  updateArticle,
  enableArticle,
  disableArticle,
  deleteArticle
};
