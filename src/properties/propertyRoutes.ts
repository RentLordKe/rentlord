import express from 'express';

import propertyValidator from './propertyValidator';
import { validationMiddleware } from '../middleware/validationMiddleware';
import {
    createProperty,
    getAllProperty,
    getMyProperty,
    getPropertyById,
    updateProperty,
    removeProperty
} from './propertyController';

const router = express.Router();

//create property
router.post('/', propertyValidator.checkCreateProperty(),  validationMiddleware, createProperty);
//Get all Properties
router.get('/admin-get-all', propertyValidator.checkGetProperty(), validationMiddleware, getAllProperty)
//Get my properties
router.get('/', propertyValidator.checkGetProperty(), validationMiddleware, getMyProperty);
//get one property
router.get('/:id',propertyValidator.checkIdParam(), validationMiddleware, getPropertyById);
//update property
router.put('/:id',propertyValidator.checkIdParam(), validationMiddleware, updateProperty);
//delete property
router.delete('/:id',propertyValidator.checkIdParam(), validationMiddleware, removeProperty);

export default router;