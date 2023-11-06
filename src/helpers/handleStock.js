// Import models
import models from '../models/index.js';

const incrementStock = async (ArticleId, quantity) => {
  const { stock } = await models.article.findOne({ _id: ArticleId });
  const nStock = parseInt(stock) + parseInt(quantity);
  return await models.article.findByIdAndUpdate(
    { _id: ArticleId },
    { stock: nStock }
  );
};

const reduceStock = async (ArticleId, quantity) => {
  const { stock } = await models.article.findOne({ _id: ArticleId });
  const nStock = parseInt(stock) - parseInt(quantity);
  return await models.article.findByIdAndUpdate(
    { _id: ArticleId },
    { stock: nStock }
  );
};

export { incrementStock, reduceStock };
