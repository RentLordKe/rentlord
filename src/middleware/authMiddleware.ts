import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";

import getUserRole from '../util/getUserRoleUtil';

dotenv.config();


const SECRET_KEY = process.env.SECRET_KEY as Secret;

export const authMiddleware = (userRole: 'tenant' | 'manager' | 'owner' | 'admin') => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return res.status(401).json({message: "unauthorized"});

            const decodeData = jwt.verify(token, SECRET_KEY) as JwtPayload;

            //check user role
            const user = await getUserRole(Number(decodeData?.id));
            if (!user) return res.status(401).json({message: "unauthorized"});
            if (user && user.role !== userRole ) return res.status(401).json({message: "unauthorized"});

            res.locals.userId = decodeData?.id;

            return next();

        } catch (error: any) {
            if (error.name === 'TokenExpiredError') return res.status(401).json({message: "expiredToken"});
            return res.status(401).json({message: "invalid Token"});
        }
    }
}




