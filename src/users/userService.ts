import { UserModel } from "../users/userModel";

interface UserRegistrationData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    idNumber: number;
    email: string;
    password: string;
    role: "tenant" | "manager" | "owner" | "admin";
}

const addUser = async ({firstName, lastName, phoneNumber, idNumber, email, password, role}: UserRegistrationData) => {
    const active = false;
    const disabled =  false;
    //Hash password before storing in DB
   
    return await UserModel.create({
        firstName,
        lastName,
        phoneNumber,
        idNumber,
        email,
        password,
        role,
        active,
        disabled
    });
}


const findUsersByRole = async (page: number, limit: number, role: UserRegistrationData["role"]) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await UserModel.findAndCountAll({
        where: {
            role,
            disabled: false
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


const findUserById = async (id: number) => {
    return await UserModel.findOne({
        where: {
            id,
            disabled: false
        }
    });
}

const findUserByEmail = async (email: string) => {
    return await UserModel.findOne({
        where: {
            email,
            disabled: false
        }
    });
}

const editUser = async () => {

}


export {
    addUser,
    editUser,
    findUsersByRole,
    findUserByEmail,
    findUserById,
};