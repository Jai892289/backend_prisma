import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Stripe from "stripe";
const stripe = new Stripe('your-secret-key-here');

const prisma = new PrismaClient();

export const checkoutPage = async (req: Request, res: Response) => {
    const { address1,
        address2,
        landmark,
        name,
        pincode,
        state,
        total,
        userEmail,
        userId,
        userName,
    } = req.body


    try {

        const data = await prisma.order.create({
            data: {
                address1: address1,
                address2: address2,
                landmark: landmark,
                name: name,
                pincode: pincode,
                state: state,
                total: total,
                userEmail: userEmail,
                userId: userId,
                userName: userName,
            }
        })
        return res.json({
            status: 200,
            data,
            msg: "product added successfully",
        });
    } catch (err) {
        console.log("err")
        return res.json({
            status: 400,
            msg: "error occured while adding in cart",
        });
    }
};


export const checkoutPageAll = async (req: Request, res: Response) => {

    // const created_at = req.query.created_at as string

    // console.log("created_at",created_at)
    
    try {
        const data = await prisma.order.findMany({
            // where: {
            // created_at: {
            //         gte: new Date(`${created_at}T00:00:00.000Z`),
            //         lt: new Date(`${created_at}T23:59:59.999Z`),
            //     },
            // }
        })
        return res.json({
            status: 200,
            data,
            msg: "product fetched successfully",
        });
    } catch (err) {
        console.log("err")
        return res.json({
            status: 400,
            msg: "error occured while fetching",
        });
    }


}

export const checkoutPageAllDayWise = async (req: Request, res: Response) => {

    // const created_at = req.query.created_at as string

    // console.log("created_at",created_at)
    
    try {
        const data = await prisma.order.findMany({
            // where: {
            // created_at: {
            //         gte: new Date(`${created_at}T00:00:00.000Z`),
            //         lt: new Date(`${created_at}T23:59:59.999Z`),
            //     },
            // }
        })
        return res.json({
            status: 200,
            data,
            msg: "product fetched successfully",
        });
    } catch (err) {
        console.log("err")
        return res.json({
            status: 400,
            msg: "error occured while fetching",
        });
    }


}


export const checkoutPagePayment = async (req: Request, res: Response) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        console.log("Payment Intent:", paymentIntent);

        return res.send({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error("Error creating payment intent:", err);
        return res.json({
            status: 400,
            msg: "Error occurred while creating payment intent",
        });
    }
};





// app.post('/auth/api/v1/create-payment-intent', async (req, res) => {
//     const { amount, currency } = req.body;

//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency,
//         });

//         res.send({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// });
