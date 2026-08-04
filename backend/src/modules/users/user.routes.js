import { Router } from "express";
import userController from "./user.controller.js";
import { createUserValidation } from "./user.validation.js";
import  validate  from "../../middleware/validate.middleware.js";

const router = Router();

router.post(
  "/",
  createUserValidation,
  validate,
  userController.createUser
);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;