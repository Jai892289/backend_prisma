import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


const prisma = new PrismaClient()

const keys = process.env.JWTPRIVATEKEY || ''

export const signUp = async (req: Request, res: Response) => {

    const { name, email, password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const values = await prisma.register.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        res.status(200).json({
            status: true,
            message: "Login successful",
            "meta-data": {
                action: "POST",
                version: "1.0",
            },
            values
        });

    } catch (err) {
        res.status(401).json({
            status: false,
            message: 'Invalid email or password',
            "meta-data": {
                action: "POST",
                version: "1.0",
            }
        });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const values = await prisma.register.findFirst({
            select: {
                email: true,
                password: true,
                id: true,
                name: true
            },
            where: {
                email: email,
            }
        });

        if (values) {
            const dat = await bcrypt.compare(password, values.password as string);
            const payload = {
                id: values.id,
                email: values.email,
                name: values.name
            }
            if (dat) {
                const token = jwt.sign(payload, keys, {
                    expiresIn: '1h',
                });
               
                res.status(200).json({
                    status: true,
                    message: "Login successful",
                    "metadata": {
                        action: "POST",
                        version: "1.0",
                    },
                    data: {
                        token,
                        user: payload   
                }
                });
            } else {
                res.status(401).send('Failed');
            }
        }

    } catch (err) {
        res.status(401).json({
            status: false,
            message: 'Invalid email or password',
            "meta-data": {
                action: "POST",
                version: "1.0",
            }
        });
    }
}