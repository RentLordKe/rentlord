import { UnitModel } from "../units/unitModel";
import { UserModel } from "../users/userModel";
import { TenantModel } from "./tenantModel";

interface TenantRegistrationData {
    nextOfKinName: string;
    nextOfKinMobile: string;
    nextofKinRelation: string; 
    entryDate: Date;
    totalPaid: number;
    UnitId: number;
    PropertyId: number;
    UserId: number;
}

const addTenant = async ({ nextOfKinName, nextOfKinMobile, nextofKinRelation, entryDate, totalPaid, UnitId, PropertyId, UserId }: TenantRegistrationData) => {
    return await TenantModel.create({
        nextOfKinName,
        nextOfKinMobile,
        nextofKinRelation,
        entryDate,
        totalPaid,
        UnitId,
        PropertyId,
        UserId
    });
}

const findAllTenants = async (page: number, limit: number ) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await TenantModel.findAndCountAll({
        include: [ UserModel, UnitModel ],
        limit,
        offset
    });
    const totalPages = Math.ceil(count/limit);

    return {
        total: count,
        totalPages,
        currentPage: page,
        data: rows
    };
}

const findAllTenantsInProperty = async (page: number, limit: number, PropertyId: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await TenantModel.findAndCountAll({
        where:{
            PropertyId
        },
        limit,
        offset,
        include: [ UserModel, UnitModel ]
    });
    
    const totalPages = Math.ceil(count/limit);

    return {
        total: count,
        totalPages,
        currentPage: page,
        data: rows
    };
}
const findAllTenantsInPropertyCount = async (PropertyId: number) => {
    const { count } = await TenantModel.findAndCountAll({
        where: {
            PropertyId
        }
    });
    return {count};
}


const findTenantById = async (id: number) => {
    return await TenantModel.findOne({
        where: {
            id
        }
    });
}

const findTenantByUserId = async (UserId: number) => {
    return await TenantModel.findOne({
        where: {
            UserId
        }
    });
}


const editTenant = async (id: number) => {

}

export {
    addTenant,
    editTenant,
    findAllTenants,
    findAllTenantsInProperty,
    findAllTenantsInPropertyCount,
    findTenantById,
    findTenantByUserId,
};