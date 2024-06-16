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
exports.login = exports.signUp = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const keys = process.env.JWTPRIVATEKEY || '';
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const values = yield prisma.register.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        res.status(200).json({
            status: true,
            message: "Login successful",
            "meta-data": {
                action: "POST",
                version: "1.0",
            },
            values
        });
    }
    catch (err) {
        res.status(401).json({
            status: false,
            message: 'Invalid email or password',
            "meta-data": {
                action: "POST",
                version: "1.0",
            }
        });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const values = yield prisma.register.findFirst({
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
            const dat = yield bcrypt_1.default.compare(password, values.password);
            const payload = {
                id: values.id,
                email: values.email,
                name: values.name
            };
            if (dat) {
                const token = jsonwebtoken_1.default.sign(payload, keys, {
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
            }
            else {
                res.status(401).send('Failed');
            }
        }
    }
    catch (err) {
        res.status(401).json({
            status: false,
            message: 'Invalid email or password',
            "meta-data": {
                action: "POST",
                version: "1.0",
            }
        });
    }
});
exports.login = login;
//# sourceMappingURL=login.controller.js.map