import express from "express";

import { userController } from "./userControllers";

const router = express.Router();

router.route("/").get(userController);

router.route("/:id").get(userController);

router.route("/addGame").post(userController);

export default router;
