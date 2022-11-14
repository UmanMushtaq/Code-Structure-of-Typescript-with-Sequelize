import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";


class UserController{
    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
          req.body.email = req.body.email.toLowerCase();
          const result = await userService.signUp(req.body);
    
          return res.status(201).send({
            email: result
          });
        } catch (error) {
          return next(error);
        }
      }
      async verifyEmail(req: Request, res: Response, next: NextFunction) {
        try {
          const result = await userService.verifyEmail(req.body.token);
    
          return res.status(200).send({
            token: result
          });
        } catch (error) {
          return next(error);
        }
      }

      async signIn(req: Request, res: Response, next: NextFunction){
        try {
          req.body.email = req.body.email.toLowerCase();
          const result = await userService.signIn(
            req.body
          );
          if (result) {
            return res.status(200).send({
              token: result,
              email: req.body.email,
            });
          } else {
            return res.status(200).send({
              msg: "OTP is send to your number",
            });
          }
        } catch (error) {
          return next(error);
        }
      }
}
export default new UserController();