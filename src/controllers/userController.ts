import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";


class UserController{
    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
          req.body.email = req.body.email.toLowerCase();
          const result = await userService.signUp(req.body);
    
          return res.status(201).send({
            token: result.token,
            email: result.email,
          });
        } catch (error) {
          return next(error);
        }
      }
}
export default new UserController();