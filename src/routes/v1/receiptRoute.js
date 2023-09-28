// import routerx
import routerx from "express-promise-router";
// Import Controller
import {
  getAllReceipt,
  getReceipt,
  createReceipt,
  enableReceipt,
  disableReceipt,
} from "../../controller/receiptController.js";
// Import Validator
import {
  validatorCreateReceipt,
  validatorUpdateStatus,
} from "../../middleware/validators/receiptValidator.js";
// Import middleware
import { verifyStoreKepper } from "../../middleware/authMiddleware.js";

const router = routerx();

router
  .get("/:ReceiptId", verifyStoreKepper, getReceipt)
  .patch(
    "/:ReceiptId/enable",
    verifyStoreKepper,
    validatorUpdateStatus,
    enableReceipt
  )
  .patch(
    "/:ReceiptId/disable",
    verifyStoreKepper,
    validatorUpdateStatus,
    disableReceipt
  )
  .get("/", verifyStoreKepper, getAllReceipt)
  .post("/", verifyStoreKepper, validatorCreateReceipt, createReceipt);

export default router;
