import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = 'your-secret-key';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    
    console.log("token", token)


    if (token) {
        jwt.verify(token, secretKey, (err: any) => {
            
        if (err) {
                return res.status(403).send("Access denied");
        }

        if (token) {
            next();
            }
            
        })
    } else {
       res.status(403).send("unAuthorised")
    }
}