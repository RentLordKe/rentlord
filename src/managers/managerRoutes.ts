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

const router = express.Router();

//create Manager
router.post('/', managerValidator.checkCreateManager(),  validationMiddleware, createManager);
//Get all Managers
router.get('/', managerValidator.checkGetManager(), validationMiddleware, getAllManagers)
//get one Manager
router.get('/:id',managerValidator.checkIdParam(), validationMiddleware, getManagerById);
//update Manager
router.put('/:id',managerValidator.checkIdParam(), validationMiddleware, updateManager);
//delete Manager
router.delete('/:id',managerValidator.checkIdParam(), validationMiddleware, removeManager);

export default router;