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
exports.DataController = void 0;
const client_1 = require("@prisma/client");
class DataController {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getAllData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page, 10);
                const limit = parseInt(req.query.limit, 10) || 10;
                const count = yield this.prisma.user.count();
                const skip = (page - 1) * limit;
                const totalPages = Math.round(count / limit);
                console.log("skip", skip);
                const users = yield this.prisma.user.findMany({
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
            }
            catch (error) {
                console.error("Error retrieving all users:", error);
                return res.status(500).json({ error: "Failed to retrieve users" });
            }
        });
    }
}
exports.DataController = DataController;
//# sourceMappingURL=getAllUser.controller.js.map