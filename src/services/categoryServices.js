// import models
import models from "../models/index.js";

export default {
  getAllCategories: async () => {
    let result = await models.category.find({});
    return result;
  },
  getCategory: async (CategoryId) => {
    let result = await models.category.findById(CategoryId);
    return result;
  },
  createCategory: async (category) => {
    let result = await models.category.create(category);
    return result;
  },
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
  deleteCategory: async (CategoryId) => {
    let result = await models.category.findByIdAndDelete(CategoryId);

    return result;
  },
};
