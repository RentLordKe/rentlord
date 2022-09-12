import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize as db} from '../config/dbconfig';
import { PropertyModel } from '../properties/propertyModel';
import { TenantModel } from '../tenants/tenantModel';

interface DamageAttributes {
    id: number;
    description: string;
    worth: number; 
    cleared: boolean;
    TenantId: number;
    PropertyId: number
}

type DamageCreationAttributes = Optional<DamageAttributes, 'id'>;


export class DamageModel extends Model<DamageAttributes, DamageCreationAttributes> {}


DamageModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   description:{
    type: DataTypes.STRING,
    allowNull: false
   },
   worth: {
    type: DataTypes.STRING,
    allowNull: false
   },
   cleared: {
    type: DataTypes.BOOLEAN,
    allowNull: false
   },
   TenantId: {
    type: DataTypes.BIGINT
   },
   PropertyId: {
    type: DataTypes.BIGINT
   }
   
},{
    sequelize: db,
    tableName: "damages",
    modelName: "Damage",
});

TenantModel.hasMany(DamageModel);
DamageModel.belongsTo(TenantModel);

PropertyModel.hasMany(DamageModel);
DamageModel.belongsTo(PropertyModel);
