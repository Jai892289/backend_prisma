import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinaryConfig';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export const fileUpload = async (req: Request, res: Response) => {
    if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded"
    });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const user = await prisma.file.create({
      data: {
        image: result.secure_url
      }
    });

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error"
    });
  }
};




export const fileUploadGet = async (req: Request, res: Response) => {
    const id = Number(req.query.id)
    
  try {
    const user = await prisma.file.findFirst({
      where: {
        id:id
      }
    })
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
}