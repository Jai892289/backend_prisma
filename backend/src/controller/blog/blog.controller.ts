import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import cloudinary from "../../utils/cloudinaryConfig";


const prisma = new PrismaClient();

export const authorPost = async (req: Request, res: Response) => {
  const { title, content, author_Id, category_id } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result", result);

    const user = await prisma.post.create({
      data: {
        title,
        image: result.secure_url,
        content,
        author_Id: parseInt(author_Id),
        category_id: parseInt(category_id),
      },
      include: {
        category: true,
        comment:true
      },
    });
    console.log("user", user)
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to post users" });
  }
};


export const authorGetPost = async (req: Request, res: Response) => {
  const id = Number(req.query.id);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;

  const count = await prisma.post.count();
  const totalPages = Math.ceil(count / limit);
  const skip = (page - 1) * limit;

  try {
    const user = await prisma.register.findMany({
      where: {
        id: id,
      },
      
      include: {
        post: {
        skip: skip,
        take:limit,
          include: {
            category: true,
            comment:true
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const id = Number(req.query.id);

  const { title, content, author_Id } = req.body;

  try {
    const user = await prisma.post.update({
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to update users" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const id = Number(req.query.id);
  console.log("id", id);
  try {
    const user = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return res.json({
      status: 200,
      data: user,
      msg: "user deleted succesfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to delete users" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const id = Number(req.query.id);

  try {
    const user = await prisma.post.findFirst({
      where: {
        id: id,
      },
      include: {
            category: true,
      },
    });
    return res.json({ status: 200, data: user, msg: "user found succesfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};


export const allPost = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const categoryId = Number(req.query.categoryId);
    // const search = req.query;

    const count = await prisma.post.count();
    const totalPages = Math.ceil(count / limit);
    const skip = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {
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

    const user = await prisma.post.findMany(query);

    console.log("user", user)
    return res.json({
      status: 200,
      data: {
        totalPages,
        currentPage: page,
        user,
      },
      msg: "user found succesfully",
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

///////////////////////////////////////////