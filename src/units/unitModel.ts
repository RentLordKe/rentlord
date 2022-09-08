import { DataTypes, Model, Optional } from 'sequelize';

import db from '../config/dbconfig';
import { PropertyModel } from "../properties/propertyModel";

interface UnitAttributes {
    id: number;
    unitNumber: string;
    depositAmount: number;
    rentAmount: number; 
    otherFees: number;
    currency: string;
    vacant: boolean;
    PropertyId: number
}

type UnitCreationAttributes = Optional<UnitAttributes, 'id'>;


export class UnitModel extends Model<UnitAttributes, UnitCreationAttributes> {}


UnitModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   unitNumber: {
    type:DataTypes.STRING,
    allowNull: false,
    field: "unit_number"
   },
   depositAmount:{
    type: DataTypes.DECIMAL,
    allowNull: false,
    field: "deposit_amount"
   },
   rentAmount:{
    type: DataTypes.DECIMAL,
    allowNull: false,
    field: "rent_amount"
   },
   otherFees:{
    type: DataTypes.DECIMAL,
    field: "other_fees"
   },
   currency: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   vacant:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
   },
   PropertyId: {
    type: DataTypes.BIGINT,
    field: "property_id"
   }
   
},{
    sequelize: db,
    tableName: "units",
    modelName: "Unit",
});

PropertyModel.hasMany(UnitModel);
UnitModel.belongsTo(PropertyModel);
