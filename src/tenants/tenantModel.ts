import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize as db} from '../config/dbconfig';
import { UserModel } from '../users/userModel';
import { UnitModel } from '../units/unitModel';
import { PropertyModel } from '../properties/propertyModel';

interface TenantAttributes {
    id: number;
    nextOfKinName: string;
    nextOfKinMobile: string;
    nextofKinRelation: string; 
    entryDate: Date;
    totalPaid: number;
    UnitId: number;
    PropertyId: number;
    UserId: number;
}

type TenantCreationAttributes = Optional<TenantAttributes, 'id'>;


export class TenantModel extends Model<TenantAttributes, TenantCreationAttributes> {}


TenantModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   nextOfKinName: {
    type:DataTypes.STRING,
    allowNull: false,
    field: "next_of_kin_name"
   },
   nextOfKinMobile:{
    type: DataTypes.STRING,
    allowNull: false,
    field: "next_of_kin_mobile"
   },
   nextofKinRelation:{
    type: DataTypes.STRING,
    allowNull: false,
    field: "next_of_kin_relation"
   },
   entryDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "entry_date"
   },
   totalPaid:{
    type: DataTypes.DECIMAL,
    field: "total_paid"
   },
   UnitId:{
    type: DataTypes.BIGINT,
    field: "unit_id"
   },
   PropertyId: {
    type: DataTypes.BIGINT,
    field: "property_id"
   },
   UserId: {
    type: DataTypes.BIGINT,
    field: "user_id"
   }
   
},{
    sequelize: db,
    tableName: "tenants",
    modelName: "Tenant",
});

UserModel.hasOne(TenantModel);
TenantModel.belongsTo(UserModel);

UnitModel.hasOne(TenantModel);
TenantModel.belongsTo(UnitModel);

PropertyModel.hasMany(TenantModel);
TenantModel.belongsTo(PropertyModel);


