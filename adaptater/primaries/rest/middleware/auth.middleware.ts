import { Router, Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

process.env.SECRET_KEY = "secret";
const accessTokenSecret = process.env.SECRET_KEY;

export const authenticateJWT = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.body.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};