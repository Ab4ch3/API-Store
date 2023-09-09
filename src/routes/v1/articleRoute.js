// import routerx
import routerx from "express-promise-router";
// Import Controller
import {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  enableArticle,
  disableArticle,
  deleteArticle,
} from "../../controller/articleController.js";
// Import Validator
import { validatorCreateArticle } from "../../middleware/validators/articleValidator.js";

const router = routerx();

router
  .get("/:ArticleId", getArticle)
  .put("/:ArticleId", updateArticle)
  .delete("/:ArticleId", deleteArticle)
  .patch("/:ArticleId/enable", enableArticle)
  .patch("/:ArticleId/disable", disableArticle)
  .get("/", getAllArticles)
  .post("/", validatorCreateArticle, createArticle);

export default router;
