import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export class DataController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllData(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string, 10);
            const limit = parseInt(req.query.limit as string, 10) || 10;
            const count = await this.prisma.user.count();
            const skip = (page - 1) * limit;

            const totalPages = Math.round(count / limit);
            console.log("skip", skip)
            const users = await this.prisma.user.findMany({
                skip: skip,
                take: limit,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    address: true,
                },
                orderBy: {
                    id: 'asc'
                },
                // where: {
                //     id: {
                //         lte: 5
                //     }
                // }
            });
            
            return res.send({
                status: 200,
                data: {
                    totalPages,
                    users
                }
            });
            
        } catch (error) {
            console.error("Error retrieving all users:", error);
            return res.status(500).json({ error: "Failed to retrieve users" });
        }
    }
}

