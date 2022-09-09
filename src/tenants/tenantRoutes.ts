import express from 'express';

import tenantValidator from './tenantValidator';
import { validationMiddleware } from '../middleware/validationMiddleware';
import {
    createTenant,
    getAllTenants,
    getMyTenants,
    getTenantById,
    updateTenant
} from './tenantController';

const router = express.Router();

//create tenat
router.post('/', tenantValidator.checkCreateTenant(),  validationMiddleware, createTenant);
//Get all tenants
router.get('/all', tenantValidator.checkGetTenant(), validationMiddleware, getAllTenants)
//Get my ttenants
router.get('/', tenantValidator.checkGetTenant(), validationMiddleware, getMyTenants);
//Get one tenant
router.get('/:id',tenantValidator.checkIdParam(), validationMiddleware, getTenantById);
//update tenant
router.put('/:id',tenantValidator.checkIdParam(), validationMiddleware, updateTenant);


export default router;