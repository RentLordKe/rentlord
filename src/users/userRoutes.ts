import express from 'express';

import userValidator from './userValidator';
import { validationMiddleware } from '../middleware/validationMiddleware';
import {
    createUser,
    getOneUser,
    getUsersByRole,
    removeUser,
    updateUser
} from './userController';

const router = express.Router();

//create user
router.post('/', userValidator.checkCreateUser(),  validationMiddleware, createUser);
//Get all users by role
router.get('/', userValidator.checkGetUsers(), validationMiddleware, getUsersByRole);
//get one user
router.get('/:id', userValidator.checkIdParam(), validationMiddleware, getOneUser);
//update user
router.put('/:id', userValidator.checkIdParam(), validationMiddleware, updateUser);
//delete user
router.delete('/:id', userValidator.checkIdParam(), validationMiddleware, removeUser);

export default router;