import { Request, Response } from 'express';

import {
    addProperty,
    findAllProperty,
    findMyProperty,
    findPropertyById,
    findPropertyByNameAndLocation,
    editProperty
} from './propertyService';


const createProperty = async (req: Request, res: Response) => {
    const { propertyName, location, buildingType, totalUnits } = req.body;
    const UserId = res.locals.userId;

    try {
        const property = await findPropertyByNameAndLocation(propertyName, location);
        if(property) return res.status(400).json({message: "Property already exists"});
        const record  = await addProperty({ propertyName, location, buildingType, totalUnits }, UserId);
        return res.status(201).json({record, message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getAllProperty = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;

    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
   
    try {
        //Find properties with pagination
        const properties = await findAllProperty(page, limit);
        return res.status(200).json(properties);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getMyProperty = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    const UserId = res.locals.userId;
    
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
   
    try {
        //Find properties with pagination
        const properties = await findMyProperty(page, limit, UserId);
        return res.status(200).json(properties);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getPropertyById = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const property = await findPropertyById(Number(id));
        if (!property) return res.status(404).json({message: `property with id = ${id} does not exists`});
        return res.json(property);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const updateProperty =  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const property = await findPropertyById(Number(id));
        if (!property) return res.status(404).json({message: `property with id = ${id} does not exists`});
    
        //To be implemented
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }

}

const removeProperty = async (req: Request, res: Response) => {
    const { id } = req.params;
    const UserId = res.locals.userId;
    try {
        const property = await findPropertyById(Number(id));
        if (!property) return res.status(404).json({message: `property with id = ${id} does not exists`});
        //Check if property belongs to the user before deleting
        const propertyObject = property.toJSON();
        if (propertyObject.UserId != UserId) return res.status(401).json({message: "unauthorized"});

        await property.destroy();
        return res.json({message: "success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


export {
    createProperty,
    getAllProperty,
    getMyProperty,
    getPropertyById,
    updateProperty,
    removeProperty
};