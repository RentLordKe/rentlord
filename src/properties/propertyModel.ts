import { DataTypes, Model, Optional } from 'sequelize';

import db from '../config/dbconfig';
import { UserModel } from '../users/userModel'

interface PropertyAttributes {
    id: number;
    propertyName: string;
    location: string; 
    buildingType: "commercial" | "residential";
    totalUnits: number;
    UserId: number;
}

type PropertyCreationAttributes = Optional<PropertyAttributes, 'id'>;


export class PropertyModel extends Model<PropertyAttributes, PropertyCreationAttributes> {}


PropertyModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   propertyName:{
    type: DataTypes.STRING,
    allowNull: false,
    field: "property_name"
   },
   location: {
    type: DataTypes.STRING,
    allowNull: false
   },
   buildingType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "building_type"
   },
   totalUnits: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "total_units"
   },
   UserId: {
    type: DataTypes.BIGINT
   }
   
},{
    sequelize: db,
    tableName: "properties",
    modelName: "Property",
});

UserModel.hasMany(PropertyModel);
PropertyModel.belongsTo(UserModel);
