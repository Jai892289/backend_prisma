import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import cloudinary from "../utils/cloudinaryConfig";

const prisma = new PrismaClient();


export const getAuthorPosts = async (req: Request, res: Response) => {
  const { id, search } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        author_Id: Number(id),
        OR: search
          ? [
            {
              title: {
                contains: search as string,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: search as string,
                mode: "insensitive",
              },
            },
          ]
          : undefined,
      },
    });

    return res.json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch posts" });
  }
};

export const categoryPost = async (req: Request, res: Response) => {
  const { id, categories } = req.body;
  try {
    const user = await prisma.category.create({
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
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ error: "Failed to post users" });
  }
};

export const categoryPostGet = async (req: Request, res: Response) => {
  try {
    const user = await prisma.category.findMany();

    return res.json({
      status: 200,
      data: user,
      msg: "category found successfully",
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ error: "Failed to found category" });
  }
};

export const categoryPostbyId = async (req: Request, res: Response) => {
  const category_id = Number(req.query.category_id);

  try {
    const user = await prisma.post.findMany({
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
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ error: "Failed to post users" });
  }
};


//////////////////////////////////////////////////////////////////////////////////////////////////////


export const commentPost = async (req: Request, res: Response) => {
  const { comment, post_id } = req.body;

  try {
    const value = await prisma.comment.createMany({
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
  } catch (err) {
    console.log("err", err)
    return res.status(500).json({ error: "Failed to post users" });
  }
};

export const getAllComment = async (req: Request, res: Response) => {
  const post_id = Number(req.query.post_id)
  try {
    const values = await prisma.comment.findMany({
      where: {
        post_id:post_id
      },
      orderBy: {
        created_at:'desc'
      }
    });
    return res.json({
      status: 200,
      data: values,
      msg: " comment fetched successfully",
    });

  } catch (err) {
    console.log(err, "err")
    return res.status(500).json({ error: "Failed to fetch comment" });
  }
}

export const updateAllPost = async (req: Request, res: Response) => {
  const { id, comment } = req.body;

  try {
    const values = await prisma.comment.update({
      data: {
        comment: comment
      },
      where: {
        id: id
      }

    })
    res.json({
      status: 200,
      data: values,
      msg: "user updated successfully",

    })
  } catch (err) {
    return res.status(500).json({ error: "Failed to update comment" });
  }


}

export const deleteAllComment = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const values = await prisma.comment.delete({
      where: {
        id: id
      }
    })
    res.json({
      status: 200,
      data: values,
      msg: "user deleted"
    })
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete comment" });
  }
}