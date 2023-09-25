// import routerx
import routerx from "express-promise-router";
// Import Controller
import {
  getAllUsers,
  getUser,
  createUser,
  updateUsers,
  updatePassword,
  enableUser,
  disableUser,
  deleteUser,
} from "../../controller/userController.js";
// Import Validator
import {
  validatorCreateUser,
  validatorUpdatePassword,
} from "../../middleware/validators/userValidator.js";

const router = routerx();

router
  .get("/:UserId", getUser)
  .put("/:UserId", updateUsers)
  .delete("/:UserId", deleteUser)
  .patch("/:UserId/enable", enableUser)
  .patch("/:UserId/disable", disableUser)
  .patch("/:UserId/password", validatorUpdatePassword, updatePassword)
  .get("/", getAllUsers)
  .post("/", validatorCreateUser, createUser);

export default router;
