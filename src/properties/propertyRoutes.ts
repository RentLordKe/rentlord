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
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

//create property
router.post('/', authMiddleware('owner'), propertyValidator.checkCreateProperty(),  validationMiddleware, createProperty);
//Get all Properties
router.get('/admin-get-all', authMiddleware('admin'), propertyValidator.checkGetProperty(), validationMiddleware, getAllProperty)
//Get my properties
router.get('/', authMiddleware('owner'), propertyValidator.checkGetProperty(), validationMiddleware, getMyProperty);
//get one property
router.get('/:id',authMiddleware('owner'), propertyValidator.checkIdParam(), validationMiddleware, getPropertyById);
//update property
router.put('/:id',authMiddleware('owner'), propertyValidator.checkIdParam(), validationMiddleware, updateProperty);
//delete property
router.delete('/:id',authMiddleware('owner'), propertyValidator.checkIdParam(), validationMiddleware, removeProperty);

export default router;