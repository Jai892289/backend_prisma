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
exports.getAllDatas = exports.getAllDeduction = exports.getAllBasicPay = exports.updateUser = exports.deleteUser = exports.getAllData = exports.updateController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("id", id);
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: Number(id),
            }
        });
        return res.json({ status: 201, data: user, msg: "user found" });
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to get users" });
    }
});
exports.updateController = updateController;
// export const getAllData = async (req: Request, res: Response) => {
//     try {
//         const page = parseInt(req.query.page as string, 10);
//         const limit = parseInt(req.query.limit as string, 10) || 10;
//         const count = await prisma.user.count();
//         const totalPages = Math.round(count / limit);
//         const users = await prisma.user.findMany({
//             skip: (page-1)* limit,
//             take: limit,
//             select: {
//                 id: true,
//                 name: true,
//                 email: true,
//                 address:true,
//             },
//             orderBy: {
//                 id: 'desc'
//             },
//             where: {
//                 id: {
//                     lte:5
//                 }
//             }
//         });
//         return res.send({
//             status: 200, data: {
//                 totalPages,
//                 users
//         } });
//     } catch (error) {
//         console.error("Error retrieving all users:", error);
//         return res.status(500).json({ error: "Failed to retrieve users" });
//     }
// }
const getAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const values = yield prisma.user.findMany({
        skip: 10,
        orderBy: {
            id: 'asc'
        },
        select: {
            id: true,
            name: true,
            email: true,
            address: true
        }
    });
    res.json({ status: 200, data: values, msg: "user fetched" });
});
exports.getAllData = getAllData;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const values = yield prisma.user.delete({
        where: {
            id: Number(id)
        }
    });
    res.json({ status: 200, data: values, msg: "user deleted" });
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, address } = req.body;
    const values = yield prisma.user.update({
        data: {
            name: name,
            email: email,
            address: address
        },
        where: {
            id: Number(id)
        },
        select: {
            name: true,
            // id: true,
            email: true
        }
    });
    res.json({ status: 200, data: values, msg: "user deleted" });
});
exports.updateUser = updateUser;
const getAllBasicPay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId, amount, name } = req.body;
    const posts = yield prisma.basic_pay.create({
        data: {
            employeeId,
            amount,
            name
        }
    });
    res.json(posts);
});
exports.getAllBasicPay = getAllBasicPay;
const getAllDeduction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId, amount, email, address } = req.body;
    const posts = yield prisma.deduction.create({
        data: {
            employeeId,
            amount,
            email,
            address
        }
    });
    res.json(posts);
});
exports.getAllDeduction = getAllDeduction;
const getAllDatas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rawData = yield prisma.$queryRaw `
    --   SELECT bp.id,
    --          bp.amount AS basic_pay_amount,
    --          ded.amount AS deduction_amount
    --   FROM basic_pay AS bp
    --   LEFT JOIN deduction AS ded ON bp.id = ded.id
    SELECT bp.id, bp.amount as basic_pay_amount , ded.amount as deduction_amount,  (bp.amount + ded.amount) AS total_amount
    FROM basic_pay as bp 
    left JOIN deduction as ded ON bp.id= ded.id
    `;
        const data = rawData.map(({ id, basic_pay_amount, deduction_amount, total_amount }) => ({
            id,
            basic_pay_amount,
            deduction_amount,
            total_amount
        }));
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllDatas = getAllDatas;
////////////////////////////////////////////////
//# sourceMappingURL=user.controller.js.map