"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutPagePayment = exports.checkoutPageAllDayWise = exports.checkoutPageAll = exports.checkoutPage = void 0;
const client_1 = require("@prisma/client");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('your-secret-key-here');
const prisma = new client_1.PrismaClient();
const checkoutPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address1, address2, landmark, name, pincode, state, total, userEmail, userId, userName, } = req.body;
    try {
        const data = yield prisma.order.create({
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
        });
        return res.json({
            status: 200,
            data,
            msg: "product added successfully",
        });
    }
    catch (err) {
        console.log("err");
        return res.json({
            status: 400,
            msg: "error occured while adding in cart",
        });
    }
});
exports.checkoutPage = checkoutPage;
const checkoutPageAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const created_at = req.query.created_at as string
    // console.log("created_at",created_at)
    try {
        const data = yield prisma.order.findMany({
        // where: {
        // created_at: {
        //         gte: new Date(`${created_at}T00:00:00.000Z`),
        //         lt: new Date(`${created_at}T23:59:59.999Z`),
        //     },
        // }
        });
        return res.json({
            status: 200,
            data,
            msg: "product fetched successfully",
        });
    }
    catch (err) {
        console.log("err");
        return res.json({
            status: 400,
            msg: "error occured while fetching",
        });
    }
});
exports.checkoutPageAll = checkoutPageAll;
const checkoutPageAllDayWise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const created_at = req.query.created_at as string
    // console.log("created_at",created_at)
    try {
        const data = yield prisma.order.findMany({
        // where: {
        // created_at: {
        //         gte: new Date(`${created_at}T00:00:00.000Z`),
        //         lt: new Date(`${created_at}T23:59:59.999Z`),
        //     },
        // }
        });
        return res.json({
            status: 200,
            data,
            msg: "product fetched successfully",
        });
    }
    catch (err) {
        console.log("err");
        return res.json({
            status: 400,
            msg: "error occured while fetching",
        });
    }
});
exports.checkoutPageAllDayWise = checkoutPageAllDayWise;
const checkoutPagePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, currency } = req.body;
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount,
            currency,
        });
        console.log("Payment Intent:", paymentIntent);
        return res.send({ clientSecret: paymentIntent.client_secret });
    }
    catch (err) {
        console.error("Error creating payment intent:", err);
        return res.json({
            status: 400,
            msg: "Error occurred while creating payment intent",
        });
    }
});
exports.checkoutPagePayment = checkoutPagePayment;
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
//# sourceMappingURL=checkoutcontroller.js.map