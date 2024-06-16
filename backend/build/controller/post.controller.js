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
exports.deleteAllComment = exports.updateAllPost = exports.getAllComment = exports.commentPost = exports.categoryPostbyId = exports.categoryPostGet = exports.categoryPost = exports.getAuthorPosts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAuthorPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, search } = req.query;
    if (!id) {
        return res
            .status(400)
            .json({ success: false, message: "User ID is required" });
    }
    try {
        const posts = yield prisma.post.findMany({
            where: {
                author_Id: Number(id),
                OR: search
                    ? [
                        {
                            title: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            content: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    ]
                    : undefined,
            },
        });
        return res.json({ success: true, data: posts });
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to fetch posts" });
    }
});
exports.getAuthorPosts = getAuthorPosts;
const categoryPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, categories } = req.body;
    try {
        const user = yield prisma.category.create({
            data: {
                id: id,
                categories: categories,
            },
        });
        return res.json({
            status: 200,
            data: user,
            msg: "user category created successfully",
        });
    }
    catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Failed to post users" });
    }
});
exports.categoryPost = categoryPost;
const categoryPostGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.category.findMany();
        return res.json({
            status: 200,
            data: user,
            msg: "category found successfully",
        });
    }
    catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Failed to found category" });
    }
});
exports.categoryPostGet = categoryPostGet;
const categoryPostbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category_id = Number(req.query.category_id);
    try {
        const user = yield prisma.post.findMany({
            where: {
                category_id: category_id,
            },
            include: {
                category: true,
                author: true,
            },
        });
        return res.json({
            status: 200,
            data: user,
            msg: "user category created successfully",
        });
    }
    catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Failed to post users" });
    }
});
exports.categoryPostbyId = categoryPostbyId;
//////////////////////////////////////////////////////////////////////////////////////////////////////
const commentPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment, post_id } = req.body;
    try {
        const value = yield prisma.comment.createMany({
            data: {
                comment,
                post_id,
            },
        });
        return res.json({
            status: 200,
            data: value,
            msg: "comment created successfully",
        });
    }
    catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Failed to post users" });
    }
});
exports.commentPost = commentPost;
const getAllComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post_id = Number(req.query.post_id);
    try {
        const values = yield prisma.comment.findMany({
            where: {
                post_id: post_id
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        return res.json({
            status: 200,
            data: values,
            msg: " comment fetched successfully",
        });
    }
    catch (err) {
        console.log(err, "err");
        return res.status(500).json({ error: "Failed to fetch comment" });
    }
});
exports.getAllComment = getAllComment;
const updateAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, comment } = req.body;
    try {
        const values = yield prisma.comment.update({
            data: {
                comment: comment
            },
            where: {
                id: id
            }
        });
        res.json({
            status: 200,
            data: values,
            msg: "user updated successfully",
        });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to update comment" });
    }
});
exports.updateAllPost = updateAllPost;
const deleteAllComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const values = yield prisma.comment.delete({
            where: {
                id: id
            }
        });
        res.json({
            status: 200,
            data: values,
            msg: "user deleted"
        });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to delete comment" });
    }
});
exports.deleteAllComment = deleteAllComment;
//# sourceMappingURL=post.controller.js.map