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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatData = exports.productAdd = exports.cartData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const cartData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.cart.findMany();
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
            msg: "error occured while fetching data",
        });
    }
});
exports.cartData = cartData;
const productAdd = (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { item, price, quantity, description, wishlist } = req.body;
    try {
        const data = yield prisma.cart.create({
            data: {
                item,
                price,
                quantity,
                description,
                wishlist
            }
        });
        return res.json({
            status: 200,
            data,
            msg: "product added succesfully"
        });
    }
    catch (err) {
        console.log("err");
        return res.json({
            status: 400,
            msg: "error adding product"
        });
    }
});
exports.productAdd = productAdd;
const chatData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.chat_bot.findMany();
        return res.json({
            status: 200,
            data,
            msg: "chat fetched successfully",
        });
    }
    catch (err) {
        console.log("err");
        return res.json({
            status: 400,
            msg: "error occured while fetching chat",
        });
    }
});
exports.chatData = chatData;
//# sourceMappingURL=cart.controller.js.map