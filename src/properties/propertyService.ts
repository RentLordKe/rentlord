import { PropertyModel } from "./propertyModel";

interface PropertyRegistrationData {
    propertyName: string;
    location: string; 
    buildingType: "commercial" | "residential";
    totalUnits: number;
}

const addProperty = async ({ propertyName, location, buildingType, totalUnits }: PropertyRegistrationData, UserId: number) => {
    return await PropertyModel.create({
        propertyName,
        location,
        buildingType,
        totalUnits,
        UserId
    });
}

const findAllProperty = async (page: number, limit: number ) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await PropertyModel.findAndCountAll({
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


const findMyProperty = async (page: number, limit: number, UserId: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await PropertyModel.findAndCountAll({
        where: {
            UserId
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


const findPropertyById = async (id: number) => {
    return await PropertyModel.findOne({
        where: {
            id
        }
    });
}

const findPropertyByNameAndLocation = async (propertyName: string, location: string) => {
    return await PropertyModel.findOne({
        where: {
            propertyName,
            location   
        }
    });
}


const editProperty = async () => {

}


export {
    addProperty,
    findAllProperty,
    findMyProperty,
    findPropertyById,
    findPropertyByNameAndLocation,
    editProperty
};