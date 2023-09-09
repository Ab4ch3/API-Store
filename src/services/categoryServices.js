// import models
import models from "../models/index.js";

export default {
  /**
   * Return all Categories
   * @returns
   */
  getAllCategories: async (find) => {
    let value = find;
    let result = await models.category
      .find(
        {
          $or: [
            { name: new RegExp(value, "i") },
            { description: new RegExp(value, "i") },
          ],
        },
        { created_at: 0 }
      )
      .sort({ created_at: -1 });
    return result;
  },
  /**
   * Return one Category
   * @param {*} CategoryId
   * @returns
   */
  getCategory: async (CategoryId) => {
    let result = await models.category.findById(CategoryId);
    return result;
  },
  /**
   * Return Category Created
   * @param {*} category
   * @returns
   */
  createCategory: async (category) => {
    let result = await models.category.create(category);
    return result;
  },
  /**
   * Update one category
   * @param {*} CategoryId
   * @param {*} category
   * @returns
   */
  updateCategory: async (CategoryId, category) => {
    let result = await models.category.findByIdAndUpdate(
      CategoryId,
      {
        name: category.name,
        description: category.description,
      },
      { new: true }
    );
    return result;
  },
  /**
   * Enable one Category
   * @param {*} CategoryId
   * @param {*} category
   * @returns
   */
  enableCategory: async (CategoryId, category) => {
    let result = await models.category.findByIdAndUpdate(
      CategoryId,
      {
        status: category.status,
      },
      { new: true }
    );
    return result;
  },
  /**
   * Disable one Category
   * @param {*} CategoryId
   * @param {*} category
   * @returns
   */
  disableCategory: async (CategoryId, category) => {
    let result = await models.category.findByIdAndUpdate(
      CategoryId,
      {
        status: category.status,
      },
      { new: true }
    );
    return result;
  },
  /**
   * Delete one Category
   * @param {*} CategoryId
   * @returns
   */
  deleteCategory: async (CategoryId) => {
    let result = await models.category.findByIdAndDelete(CategoryId);

    return result;
  },
};
