import express from 'express';

import managerValidator from './managerValidator';
import { validationMiddleware } from '../middleware/validationMiddleware';
import {
    createManager,
    getAllManagers,
    getManagerById,
    removeManager,
    updateManager,
} from './managerController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

//create Manager
router.post('/', authMiddleware('owner'), managerValidator.checkCreateManager(),  validationMiddleware, createManager);
//Get all Managers
router.get('/', authMiddleware('owner'), managerValidator.checkGetManager(), validationMiddleware, getAllManagers)
//get one Manager
router.get('/:managerId', authMiddleware('admin'), managerValidator.checkIdParam(), validationMiddleware, getManagerById);
//update Manager
router.put('/:managerId', authMiddleware('owner'), managerValidator.checkIdParam(), validationMiddleware, updateManager);
//delete Manager
router.delete('/:managerId',authMiddleware('owner'), managerValidator.checkIdParam(), validationMiddleware, removeManager);

export default router;