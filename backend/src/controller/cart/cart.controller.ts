import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient();
export const cartData = async (req: Request, res: Response) => {
    try {
        const data = await prisma.cart.findMany()
        return res.json({
            status: 200,
            data,
            msg: "product fetched successfully",
        });
    } catch (err) {
        console.log("err")
        return res.json({
            status: 400,
            msg: "error occured while fetching data",
        });
    }
};


export const productAdd = async (res: Response, req: Request) => {
    const { item,
        price,
        quantity,
        description,
        wishlist } = req.body
    try {
        const data = await prisma.cart.create({
            data: {
                item,
                price,
                quantity,
                description,
                wishlist
            }
        })
        return res.json({
            status: 200,
            data,
            msg: "product added succesfully"
        })
    } catch (err) {
        console.log("err")
        return res.json({
            status: 400,
            msg: "error adding product"
        })
    }
}













export const chatData = async (req: Request, res: Response) => {
    try {
        const data = await prisma.chat_bot.findMany()
        return res.json({
            status: 200,
            data,
            msg: "chat fetched successfully",
        });
    } catch (err) {
        console.log("err")
        return res.json({
            status: 400,
            msg: "error occured while fetching chat",
        });
    }
};
