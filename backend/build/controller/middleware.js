"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'your-secret-key';
const requireAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    console.log("token", token);
    if (token) {
        jsonwebtoken_1.default.verify(token, secretKey, (err) => {
            if (err) {
                return res.status(403).send("Access denied");
            }
            if (token) {
                next();
            }
        });
    }
    else {
        res.status(403).send("unAuthorised");
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=middleware.js.map