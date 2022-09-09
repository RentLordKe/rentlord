import { DamageModel } from "./damageModel";

interface PropertyRegistrationData {
    description: string;
    worth: number; 
    cleared: boolean;
    TenantId: number;
    PropertyId: number;
}

const addDamage = async ({ description, worth, cleared, TenantId, PropertyId }: PropertyRegistrationData) => {
    return await DamageModel.create({
        description,
        worth,
        cleared,
        TenantId,
        PropertyId
    });
}

const findAllDamages = async (page: number, limit: number, PropertyId: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await DamageModel.findAndCountAll({
        where: {
            PropertyId
        },
        limit,
        offset,
    });
    const totalPages = Math.ceil(count/limit);

    return {
        total: count,
        totalPages,
        currentPage: page,
        data: rows
    };
}

const findMyDamages = async (page: number, limit: number, TenantId: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await DamageModel.findAndCountAll({
        where: {
            TenantId
        },
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


const findDamageById = async (id: number) => {
    return await DamageModel.findOne({
        where: {
            id
        }
    });
}



const editDamage = async () => {

}


export {
    addDamage,
    editDamage,
    findAllDamages,
    findDamageById,
    findMyDamages,
};