// import routerx
import routerx from "express-promise-router";
// Import Controller
import {
  getAllArticles,
  getArticle,
  getArticleByBarCode,
  createArticle,
  updateArticle,
  enableArticle,
  disableArticle,
  deleteArticle,
} from "../../controller/articleController.js";
// Import Validator
import {
  validatorCreateArticle,
  validatorUpdateStatus,
} from "../../middleware/validators/articleValidator.js";
// Import middleware
import {
  verifyStoreKepper,
  verifyUserAuth,
} from "../../middleware/authMiddleware.js";

const router = routerx();

router
  .get("/code", verifyUserAuth, getArticleByBarCode)
  .get("/:ArticleId", verifyStoreKepper, getArticle)
  .put("/:ArticleId", verifyStoreKepper, updateArticle)
  .delete("/:ArticleId", verifyStoreKepper, deleteArticle)
  .patch(
    "/:ArticleId/enable",
    verifyStoreKepper,
    validatorUpdateStatus,
    enableArticle
  )
  .patch(
    "/:ArticleId/disable",
    verifyStoreKepper,
    validatorUpdateStatus,
    disableArticle
  )
  .get("/", verifyStoreKepper, getAllArticles)
  .post("/", verifyStoreKepper, validatorCreateArticle, createArticle);

export default router;
