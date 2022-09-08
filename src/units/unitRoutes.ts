import express from 'express';

import unitValidator from './unitValidator';
import { validationMiddleware } from '../middleware/validationMiddleware';
import {
    createUnit,
    getAllUnits,
    getAllVacantOrOccupiedUnits,
    getAllVacantOrOccupiedinProperty,
    getMyUnits,
    getUnitById,
    removeUnit,
    updateUnit
} from './unitController';

const router = express.Router();

//create unit
router.post('/', unitValidator.checkCreateUnit(),  validationMiddleware, createUnit);
//Get all units
router.get('/all', unitValidator.checkGetUnit(), validationMiddleware, getAllUnits)
//Get my units
router.get('/', unitValidator.checkGetUnit(), validationMiddleware, getMyUnits);
//Get all vacant units 
router.get('/all/vacant', unitValidator.checkGetUnit(), validationMiddleware, getAllVacantOrOccupiedUnits);
//Get all occupied units 
router.get('/all/occupied', unitValidator.checkGetUnit(), validationMiddleware, getAllVacantOrOccupiedUnits);
//Get all vacant units in property
router.get('/vacant', unitValidator.checkGetUnit(), validationMiddleware, getAllVacantOrOccupiedinProperty);
//Get all occupied units in property
router.get('/occupied', unitValidator.checkGetUnit(), validationMiddleware, getAllVacantOrOccupiedinProperty);
//get one unit
router.get('/:id',unitValidator.checkIdParam(), validationMiddleware, getUnitById);
//update unit
router.put('/:id',unitValidator.checkIdParam(), validationMiddleware, updateUnit);
//delete unit
router.delete('/:id',unitValidator.checkIdParam(), validationMiddleware, removeUnit);

export default router;