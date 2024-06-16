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
exports.allPost = exports.getPostById = exports.deletePost = exports.updatePost = exports.authorGetPost = exports.authorPost = void 0;
const client_1 = require("@prisma/client");
const cloudinaryConfig_1 = __importDefault(require("../../utils/cloudinaryConfig"));
const prisma = new client_1.PrismaClient();
const authorPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, author_Id, category_id } = req.body;
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded",
        });
    }
    try {
        const result = yield cloudinaryConfig_1.default.uploader.upload(req.file.path);
        console.log("result", result);
        const user = yield prisma.post.create({
            data: {
                title,
                image: result.secure_url,
                content,
                author_Id: parseInt(author_Id),
                category_id: parseInt(category_id),
            },
            include: {
                category: true,
                comment: true
            },
        });
        console.log("user", user);
        return res.json({
            status: 200,
            data: {
                data: {
                    id: user.id,
                    title: user.title,
                    content: user.content,
                    image: user.image,
                    author_Id: user.author_Id,
                    category: {
                        id: user.category.id,
                        name: user.category.categories,
                    },
                },
            },
            msg: "user created successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to post users" });
    }
});
exports.authorPost = authorPost;
const authorGetPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.query.id);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const count = yield prisma.post.count();
    const totalPages = Math.ceil(count / limit);
    const skip = (page - 1) * limit;
    try {
        const user = yield prisma.register.findMany({
            where: {
                id: id,
            },
            include: {
                post: {
                    skip: skip,
                    take: limit,
                    include: {
                        category: true,
                        comment: true
                    },
                },
            },
            orderBy: {
                id: "desc",
            },
        });
        return res.json({
            status: 200,
            data: user,
            totalPages,
            currentPage: page,
            msg: "user fetched successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to fetch users" });
    }
});
exports.authorGetPost = authorGetPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.query.id);
    const { title, content, author_Id } = req.body;
    try {
        const user = yield prisma.post.update({
            data: {
                title: title,
                content: content,
                author_Id: author_Id,
            },
            where: {
                id: id,
            },
        });
        return res.json({
            status: 200,
            data: user,
            msg: "user updated successfully",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to update users" });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.query.id);
    console.log("id", id);
    try {
        const user = yield prisma.post.delete({
            where: {
                id: id,
            },
        });
        return res.json({
            status: 200,
            data: user,
            msg: "user deleted succesfully",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to delete users" });
    }
});
exports.deletePost = deletePost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.query.id);
    try {
        const user = yield prisma.post.findFirst({
            where: {
                id: id,
            },
        });
        return res.json({ status: 200, data: user, msg: "user found succesfully" });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to fetch users" });
    }
});
exports.getPostById = getPostById;
const allPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const categoryId = Number(req.query.categoryId);
        const search = req.query;
        const count = yield prisma.post.count();
        const totalPages = Math.ceil(count / limit);
        const skip = (page - 1) * limit;
        let query = {
            skip: skip,
            take: limit,
            include: {
                category: true,
            },
        };
        if (categoryId) {
            query.where = {
                category_id: categoryId,
            };
        }
        const user = yield prisma.post.findMany(query);
        console.log("user", user);
        return res.json({
            status: 200,
            data: {
                totalPages,
                currentPage: page,
                user,
            },
            msg: "user found succesfully",
        });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to fetch users" });
    }
});
exports.allPost = allPost;
///////////////////////////////////////////
//# sourceMappingURL=blog.controller.js.map