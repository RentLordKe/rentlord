import { Request, Response } from 'express';
import { findUserById } from '../users/userService';

import {
    addManager,
    editManagers,
    findAllManagers,
    findManagerById,
    findManagerByUserId
} from './managerService';

const createManager = async (req: Request, res: Response) => {
    const { accessLevel, UserId, PropertyId } = req.body;

    try {
        //Check if Manager Exists
        const manager = await findManagerByUserId(Number(UserId));
        if (manager) return res.status(400).json({message: "manager already exists"});
        //check if user role is manager
        const user = await findUserById(Number(UserId));
        const userObject = user?.toJSON();
        if (userObject?.role != "manager") return res.status(400).json({message: `User not manager. User is ${userObject?.role}`});
        //otherwise add new record
        const record  = await addManager({ accessLevel, UserId, PropertyId });
        return res.status(201).json({record, message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getAllManagers = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    const PropertyId = 1;
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
   
    try {
        //Find Managers with pagination
        const managers = await findAllManagers(page, limit, PropertyId);
        return res.status(200).json(managers);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getManagerById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const manager = await findManagerById(Number(id));
        if (!manager) return res.status(404).json({message: `Manager with id = ${id} does not exists`});
        return res.json(manager);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const updateManager =  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const manager = await findManagerById(Number(id));
        if (!manager) return res.status(404).json({message: `Manager with id = ${id} does not exists`});
    
        //To be implemented
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }

}

const removeManager = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const manager = await findManagerById(Number(id));
        if (!manager) return res.status(404).json({message: `Manager with id = ${id} does not exists`});

        await manager.destroy();
        return res.json({message: "success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


export {
    createManager,
    getAllManagers,
    getManagerById,
    removeManager,
    updateManager,
};