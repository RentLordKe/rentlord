import { Request, Response } from 'express';

import {
    addTenant,
    editTenant,
    findAllTenants,
    findAllTenantsInProperty,
    findAllTenantsInPropertyCount,
    findTenantById,
    findTenantByUserId
} from './tenantService';

import { findPropertyById } from '../properties/propertyService';

const createTenant = async (req: Request, res: Response) => {
    const { nextOfKinName, nextOfKinMobile, nextofKinRelation, entryDate, totalPaid, UnitId, PropertyId,  UserId } = req.body;
    
    try {
        //check if tenant count is exceeded
        const property = await findPropertyById(PropertyId);
        const propertyObject = property?.toJSON();
        const tenantCount = await findAllTenantsInPropertyCount(PropertyId);
        if(propertyObject){
            if (tenantCount.count >= propertyObject?.totalUnits) return res.status(400).json({message: "Cannot exceed total unit count"});
        }
        //Check if Tenant Exists
        const tenant = await findTenantByUserId(UserId);
        if (tenant) return res.status(400).json({message: "Tenant already exists"});
        //Add tenant if does not exists
        const record  = await addTenant({ nextOfKinName, nextOfKinMobile, nextofKinRelation, entryDate, totalPaid, UnitId, PropertyId,  UserId });
        return res.status(201).json({record, message:"success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getAllTenants = async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
   
    try {
        //Find tenants with pagination
        const units = await findAllTenants(page, limit);
        return res.status(200).json(units);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


const getMyTenants= async (req: Request, res: Response) => {
    let page = req.query?.page as number | undefined;
    let limit = req.query?.limit as number | undefined;
    
    //if page is undefined set default to 1
    if(!page) page = 1;
    //if limit is undefined set default to 10
    if(!limit) limit = 10;
   
    const PropertyId = 1;

    try {
        //Find tenants with pagination
        const units = await findAllTenantsInProperty(page, limit, PropertyId);
        return res.status(200).json(units);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const getTenantById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const unit = await findTenantById(Number(id));
        if (!unit) return res.status(404).json({message: `Tenant with id = ${id} does not exists`});
        return res.json(unit);
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}

const updateTenant=  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const unit = await findTenantById(Number(id));
        if (!unit) return res.status(404).json({message: `Tenant with id = ${id} does not exists`});
    
        //To be implemented
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }

}

export {
    createTenant,
    getAllTenants,
    getMyTenants,
    getTenantById,
    updateTenant
};