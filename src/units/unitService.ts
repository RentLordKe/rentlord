import { UnitModel } from "./unitModel";

interface UnitRegistrationData {
    unitNumber: string;
    depositAmount: number;
    rentAmount: number; 
    otherFees: number;
    currency: string;
    vacant: boolean;
}

const addUnit = async ({ unitNumber, depositAmount, rentAmount, otherFees, currency, vacant }: UnitRegistrationData, PropertyId: number) => {
    return await UnitModel.create({
        unitNumber,
        depositAmount,
        rentAmount,
        otherFees,
        currency,
        vacant,
        PropertyId
    });
}

const findAllUnits = async (page: number, limit: number ) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await UnitModel.findAndCountAll({
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

const findAllVacantOrOccupiedUnits = async (page: number, limit: number, vacant: boolean ) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await UnitModel.findAndCountAll({
        where: {
            vacant
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

const findAllVacantOrOccupiedUnitsInProperty = async (page: number, limit: number, vacant: boolean, PropertyId: number ) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await UnitModel.findAndCountAll({
        where: {
            vacant,
            PropertyId
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

const findAllUnitsInPropertyCount = async (PropertyId: number) => {
    const { count } = await UnitModel.findAndCountAll({
        where: {
            PropertyId
        }
    });
    return {count};
}

const findAllUnitsInProperty = async (page: number, limit: number, PropertyId: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await UnitModel.findAndCountAll({
        where: {
            PropertyId
        },
        limit,
        offset
    });
    const totalPages = Math.ceil(count);

    return {
        total: count,
        totalPages,
        currentPage: page,
        data: rows
    };
}


const findUnitById = async (id: number) => {
    return await UnitModel.findOne({
        where: {
            id
        }
    });
}

const findUnitByUnitNumber = async (unitNumber: string) => {
    return await UnitModel.findOne({
        where: {
            unitNumber
        }
    });
}


const editUnit = async () => {

}


export {
    addUnit,
    editUnit,
    findAllUnits,
    findAllUnitsInProperty,
    findAllUnitsInPropertyCount,
    findAllVacantOrOccupiedUnits,
    findAllVacantOrOccupiedUnitsInProperty,
    findUnitById,
    findUnitByUnitNumber
};