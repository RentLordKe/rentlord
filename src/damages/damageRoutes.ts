import express from 'express';

import damageValidator from './damageValidator';
import { validationMiddleware } from '../middleware/validationMiddleware';
import {
    createDamage,
    getAllDamages,
    getDamagesById,
    getMyDamages,
    removeDamage,
    updateDamage,
} from './damageController';

const router = express.Router();

//create property
router.post('/', damageValidator.checkCreateDamage(),  validationMiddleware, createDamage);
//Get all Properties
router.get('/', damageValidator.checkGetDamage(), validationMiddleware, getAllDamages)
//Get my properties
router.get('/tenant-damages', damageValidator.checkGetDamage(), validationMiddleware, getMyDamages);
//get one property
router.get('/:id',damageValidator.checkIdParam(), validationMiddleware, getDamagesById);
//update property
router.put('/:id',damageValidator.checkIdParam(), validationMiddleware, updateDamage);
//delete property
router.delete('/:id',damageValidator.checkIdParam(), validationMiddleware, removeDamage);

export default router;