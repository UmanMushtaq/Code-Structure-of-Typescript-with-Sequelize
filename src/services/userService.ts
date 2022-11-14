import { User, UserCreationAttributes } from "../models/User";
import { BadRequestError } from "../errors/BadRequestError";
import jwt from "jsonwebtoken";
import { uuid } from 'uuidv4';
import { sequelize } from "../config/sequelize";
class UserService {
    async signUp(reqBody: UserCreationAttributes) {
        const { email, password,first_name,last_name } = reqBody;

        
        const existingUser = await User.findOne({
          where: {
            email,
          },
        });
      
        console.log("reqBody",reqBody)
      
        
        let user: any;
    
        const tx = await sequelize.transaction();
      
        user = await User.create(
          {
            email,
            password,
            first_name,
            last_name
          },
          { transaction: tx }
        );
        await tx.commit();
       
        // generating a jwt
        const token = jwt.sign(
          {
            id: user.UUID,
          },
          process.env.JWT_KEY!,
          { expiresIn: 60 * 60 * 2 }
        );
    
        return { token, email };
      }
    
}
export default new UserService();