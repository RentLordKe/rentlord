import { Request, Response } from 'express';

import {
    addUnit,
    editUnit,
    findAllUnits,
    findAllUnitsInProperty,
    findAllUnitsInPropertyCount,
    findAllVacantOrOccupiedUnits,
    findAllVacantOrOccupiedUnitsInProperty,
    findUnitById,
    findUnitByUnitNumber
} from './unitService';

import { findPropertyById } from '../properties/propertyService';


const PropertyId = 2;

const createUnit = async (req: Request, res: Response) => {
    const { unitNumber, depositAmount, rentAmount, otherFees, currency, vacant } = req.body;
    
    try {
        //check if unit count is exceeded
        const property = await findPropertyById(PropertyId);
        const propertyObject = property?.toJSON();
        const unitCount = await findAllUnitsInPropertyCount(PropertyId);
        if(propertyObject){
            if (unitCount.count >= propertyObject?.totalUnits) return res.status(400).json({message: "Cannot exceed total unit count"});
        }
        //check if unitNumber exists
        const unit = await findUnitByUnitNumber(unitNumber.toUpperCase());
        if (unit) return res.status(400).json({message: "Unit already exists"});
        //Add unit if does not exists
        const record  = await addUnit({ unitNumber: unitNumber.toUpperCase(), depositAmount, rentAmount, otherFees, currency, vacant}, PropertyId);
        return res.status(201).json({record, message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getAllUnits = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
   
    try {
        //Find units with pagination
        const units = await findAllUnits(page, limit);
        return res.status(200).json(units);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getAllVacantOrOccupiedUnits = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    let vacant: boolean = false;
    if (req.url === "/all/vacant") vacant = true;
    
    
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
    try {
        //Find units with pagination
        const units = await findAllVacantOrOccupiedUnits(page, limit, vacant);
        return res.status(200).json(units);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getAllVacantOrOccupiedinProperty = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    let vacant: boolean = false;

    if (req.url === "/vacant") vacant = true;
    
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
    try {
        //Find units with pagination
        const units = await findAllVacantOrOccupiedUnitsInProperty(page, limit, vacant, PropertyId);
        return res.status(200).json(units);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getMyUnits = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
   
    try {
        //Find units with pagination
        const units = await findAllUnitsInProperty(page, limit, PropertyId);
        return res.status(200).json(units);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getUnitById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const unit = await findUnitById(Number(id));
        if (!unit) return res.status(404).json({message: `unit with id = ${id} does not exists`});
        return res.json(unit);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const updateUnit=  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const unit = await findUnitById(Number(id));
        if (!unit) return res.status(404).json({message: `unit with id = ${id} does not exists`});
    
        //To be implemented
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }

}

const removeUnit = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const unit = await findUnitById(Number(id));
        if (!unit) return res.status(404).json({message: `unit with id = ${id} does not exists`});

        await unit.destroy();
        return res.json({message: "success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


export {
    createUnit,
    getAllUnits,
    getAllVacantOrOccupiedUnits,
    getAllVacantOrOccupiedinProperty,
    getMyUnits,
    getUnitById,
    removeUnit,
    updateUnit

};