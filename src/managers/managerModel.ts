import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize as db} from '../config/dbconfig';
import { PropertyModel } from '../properties/propertyModel';
import { UserModel } from '../users/userModel';

interface ManagerAttributes {
    id: number;
    accessLevel: 1 | 2 | 3 | 4;
    UserId: number;
    PropertyId: number
}

type ManagerCreationAttributes = Optional<ManagerAttributes, 'id'>;


export class ManagerModel extends Model<ManagerAttributes, ManagerCreationAttributes> {}


ManagerModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   accessLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "access_level"
   },
   UserId: {
    type: DataTypes.BIGINT,
    field: "user_id"
   },
   PropertyId: {
    type: DataTypes.BIGINT,
    field: "property_id"
   }
   
},{
    sequelize: db,
    tableName: "managers",
    modelName: "Manager",
});

UserModel.hasOne(ManagerModel);
ManagerModel.belongsTo(UserModel);

PropertyModel.hasMany(ManagerModel);
ManagerModel.belongsTo(PropertyModel);
