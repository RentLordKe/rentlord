import { Request, Response } from 'express';

import {
    addDamage,
    editDamage,
    findAllDamages,
    findDamageById,
    findMyDamages,
} from './damageService';

const ownerId = 7;

const createDamage = async (req: Request, res: Response) => {
    const { description, worth, cleared, TenantId, PropertyId } = req.body;
    
    try {
        const record  = await addDamage({ description, worth, cleared, TenantId, PropertyId });
        return res.status(201).json({record, message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getAllDamages = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    const PropertyId = 1;
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
   
    try {
        //Find damages with pagination
        const damages = await findAllDamages(page, limit, PropertyId);
        return res.status(200).json(damages);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getMyDamages = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    const TenantId = 2;
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
   
    try {
        //Find properties with pagination
        const damages = await findMyDamages(page, limit, TenantId);
        return res.status(200).json(damages);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getDamagesById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const damage = await findDamageById(Number(id));
        if (!damage) return res.status(404).json({message: `Damage with id = ${id} does not exists`});
        return res.json(damage);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const updateDamage =  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const damage = await findDamageById(Number(id));
        if (!damage) return res.status(404).json({message: `damage with id = ${id} does not exists`});
    
        //To be implemented
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }

}

const removeDamage = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const damage = await findDamageById(Number(id));
        if (!damage) return res.status(404).json({message: `damage with id = ${id} does not exists`});

        await damage.destroy();
        return res.json({message: "success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


export {
    createDamage,
    getAllDamages,
    getDamagesById,
    getMyDamages,
    removeDamage,
    updateDamage,
};