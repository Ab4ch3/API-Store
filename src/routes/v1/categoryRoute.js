// import routerx
import routerx from "express-promise-router";
// Import Controller
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  enableCategory,
  disableCategory,
  deleteCategory,
} from "../../controller/categoryController.js";
// Import Validator
import { validatorCreateCategory } from "../../middleware/validators/categoryValidator.js";

const router = routerx();

router
  .get("/:CategoryId", getCategory)
  .put("/:CategoryId", updateCategory)
  .delete("/:CategoryId", deleteCategory)
  .patch("/:CategoryId/enable", enableCategory)
  .patch("/:CategoryId/disable", disableCategory)
  .get("/", getAllCategories)
  .post("/", validatorCreateCategory, createCategory);

export default router;
