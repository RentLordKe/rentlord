import { Request, Response } from 'express';
import argon2 from "argon2";

import {
    addUser,
    editUser,
    findUserByEmail,
    findUserById,
    findUsersByRole,
} from './userService';


const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, phoneNumber, idNumber, email, password, role } = req.body;
    try {
        //check if user exists
        const user = await findUserByEmail(email);
        if (user) return res.status(400).json({message: "user already exists"});
        //add user if user does not exist
        const hashedPassword = await argon2.hash(password);
        const record  = await addUser({firstName, lastName, phoneNumber, idNumber, email, password: hashedPassword, role});
        return res.status(201).json({record, message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getUsersByRole = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    let role = req.query?.type as "tenant" | "manager" | "owner" | "admin";
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
    //if user type is not defined, set default to tenants
    if(!role) role = "tenant";

    try {
        //Find users with pagination
        const users = await findUsersByRole(page, limit, role);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getOneUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await findUserById(Number(id));
        if (!user) return res.status(404).json({message: `user with id = ${id} does not exists`});
        return res.json(user);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const updateUser =  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await findUserById(Number(id));
        if (!user) return res.status(404).json({message: `user with id = ${id} does not exists`});
    
        //To be implemented
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }

}

const removeUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await findUserById(Number(id));
        if (!user) return res.status(404).json({message: `user with id = ${id} does not exists`});

        await user.destroy();
        return res.json({message: "success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


export {
    createUser,
    getOneUser,
    getUsersByRole,
    removeUser,
    updateUser
};