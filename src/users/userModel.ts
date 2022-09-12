import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize as db}  from '../config/dbconfig';

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    idNumber: number;
    email: string;
    password: string;
    role: "tenant" | "manager" | "owner" | "admin";
    active: boolean;
    disabled: boolean;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;


export class UserModel extends Model<UserAttributes, UserCreationAttributes> {}


UserModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   firstName:{
    type: DataTypes.STRING,
    allowNull: false,
    field: "first_name"
   },
   lastName:{
    type: DataTypes.STRING,
    allowNull: false,
    field: "last_name"
   },
   phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "phone_number"
   },
   idNumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: "id_number"
   },
   email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
   },
   password: {
    type: DataTypes.STRING,
    allowNull: false
   },
   role: {
    type: DataTypes.STRING,
    allowNull: false
   },
   active: {
    type: DataTypes.BOOLEAN,
    allowNull: false
   },
   disabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false
   }
},{
    sequelize: db,
    tableName: "users",
    modelName: "User"
})