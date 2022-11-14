import { User, UserCreationAttributes } from "../models/User";
import { BadRequestError } from "../errors/BadRequestError";
import jwt from "jsonwebtoken";
import { uuid } from 'uuidv4';
import { sequelize } from "../config/sequelize";
import generator from 'generate-password';
import Email from '../util/Email';
import Password from '../util/Password';

class UserService {
    async signUp(reqBody: UserCreationAttributes) {
        const { email, password,first_name,last_name } = reqBody;

        
        const existingUser = await User.findOne({
          where: {
            email,
          },
        });
        if (existingUser) {
          throw new BadRequestError("Email already exists.");
        }
        let generateCode = generator.generate({ length: 8, numbers: true });
        let token = jwt.sign(generateCode, String(process.env.JWT_KEY));
        
        let user: any;
    
        const tx = await sequelize.transaction();
      
        user = await User.create(
          {
            email,
            password,
            first_name,
            last_name,
            token
          },
          { transaction: tx }
        );
        await tx.commit();
       
      let link = `${process.env.SERVER_URL}/verify/${token}`;
      await Email({
        to: email,
        subject: "Email Verification",
        text: "Hi! Click on the following link to verify your email",
        html: `Hi!  Click on the following link to verify your email. <br> <a href="${link}">${link}</a>`,
      })
    
        return email ;
      }
      async createToken(existingUser: UserCreationAttributes) {
        const token = jwt.sign(
          {
            id: existingUser.uuid,
          },
          process.env.JWT_KEY!,
        );
    
        return token ;
      }

      async verifyEmail (token:string){
        
          const user = await User.findOne({where:{token}});
          if (!user)
          {
            throw new BadRequestError("User doesn't exist.");
          }
          if (user?.email_verified)
          { 
            throw new BadRequestError("Email already verified.");
          }
          await sequelize.transaction(async () => {
          const verifyUser = await User.update({email_verified:true},{where:{email:user?.email}})
          });
        const authorisedToken =   await this.createToken(user);
        return authorisedToken;
        
      }
      
  async signIn(reqBody: UserCreationAttributes) {
    const { email, password } = reqBody;
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }
   
    return this.createToken(existingUser);
  }
}
export default new UserService();