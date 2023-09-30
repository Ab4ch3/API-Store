// Import models
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

export { incrementStock, reduceStock };
