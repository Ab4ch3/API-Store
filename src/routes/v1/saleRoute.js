// import routerx
import routerx from "express-promise-router";
// Import Controller
import {
  getAllSale,
  getSale,
  createSale,
  enableSale,
  disableSale,
} from "../../controller/saleController.js";
// Import Validator
import {
  validatorCreateSale,
  validatorUpdateStatus,
} from "../../middleware/validators/saleValidator.js";
// Import middleware
import { verifySeller } from "../../middleware/authMiddleware.js";

const router = routerx();

router
  .get("/:SaleId", verifySeller, getSale)
  .patch("/:SaleId/enable", verifySeller, validatorUpdateStatus, enableSale)
  .patch("/:SaleId/disable", verifySeller, validatorUpdateStatus, disableSale)
  .get("/", verifySeller, getAllSale)
  .post("/", verifySeller, validatorCreateSale, createSale);

export default router;
