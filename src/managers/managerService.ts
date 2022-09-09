import { UserModel } from "../users/userModel";
import { ManagerModel } from "./managerModel";

interface ManagerRegistrationData {
    accessLevel: 1 | 2 | 3 | 4;
    UserId: number;
    PropertyId: number
}

const addManager = async ({ accessLevel, UserId, PropertyId }: ManagerRegistrationData) => {
    return await ManagerModel.create({
        accessLevel,
        UserId,
        PropertyId
    });
}

const findAllManagers = async (page: number, limit: number, PropertyId: number) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await ManagerModel.findAndCountAll({
        where: {
            PropertyId
        },
        limit,
        offset,
        include: UserModel
    });
    const totalPages = Math.ceil(count/limit);

    return {
        total: count,
        totalPages,
        currentPage: page,
        data: rows
    };
}

const findManagerById = async (id: number) => {
    return await ManagerModel.findOne({
        where: {
            id
        },
        include: UserModel
    });
}

const findManagerByUserId = async (UserId: number) => {
    return await ManagerModel.findOne({
        where: {
            UserId
        }
    });
}



const editManagers = async () => {

}

export {
    addManager,
    editManagers,
    findAllManagers,
    findManagerById,
    findManagerByUserId
};