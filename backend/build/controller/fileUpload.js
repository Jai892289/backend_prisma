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
exports.fileUploadGet = exports.fileUpload = void 0;
const cloudinaryConfig_1 = __importDefault(require("../utils/cloudinaryConfig"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }
    try {
        const result = yield cloudinaryConfig_1.default.uploader.upload(req.file.path);
        const user = yield prisma.file.create({
            data: {
                image: result.secure_url
            }
        });
        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: user
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
});
exports.fileUpload = fileUpload;
const fileUploadGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.query.id);
    try {
        const user = yield prisma.file.findFirst({
            where: {
                id: id
            }
        });
        res.status(200).json({
            success: true,
            message: "Fetched Image Successfully",
            data: user
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
});
exports.fileUploadGet = fileUploadGet;
//# sourceMappingURL=fileUpload.js.map