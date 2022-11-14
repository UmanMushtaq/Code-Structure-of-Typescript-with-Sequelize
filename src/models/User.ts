import { Model, Optional, DataTypes } from "sequelize";
import { uuid } from 'uuidv4';
import { sequelize } from "../config/sequelize";
import { Password } from "../util/Password";


interface UserAttributes {
  id: number;
  uuid?: string;
  email: string;
  email_verified?:boolean,
  first_name: string;
  last_name: string;
  password: string;
  token?: string;
  expiry?: Date;

}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "uuid"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public uuid!: string;
  public email!: string;
  
  public first_name!: string;
  public last_name!: string;
  public password!: string;
 
  public token!: string;
  public expiry!: Date;
  public email_verified!: boolean;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    sequelize,
    underscored:true
  }
);

User.beforeCreate(async (user, options) => {
  user.password = await Password.toHash(user.password);
});

export { User, UserCreationAttributes, UserAttributes };
