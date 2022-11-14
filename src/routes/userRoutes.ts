import express, { Request, Response } from "express";
import validation from "../util/validationMiddlewares";
import { requireAuth } from "../middlewares/require-auth";
import { currentUser } from "../middlewares/curent-user";
import usersController from "../controllers/userController";
const router = express.Router();    

router.post("/signup", ...validation.signup, usersController.signUp);

export { router as usersRouter };