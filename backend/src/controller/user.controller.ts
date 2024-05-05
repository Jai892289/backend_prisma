import {Request,  Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const userController = async (req:Request, res:Response) => {
    
    const { name, email, address } = req.body;
    try {
        const user = await prisma.user.create({
       
        data: {
            name:name,
            email: email,
            address:address
        }
        })
            return res.json({status:200 , data:user , msg:"user created"})

    } catch (error) {
        return res.status(500).json({ error: "Failed to post users" });
    }
}


export const updateController = async ( req: Request, res: Response) => {
    const { id } = req.params;
    console.log("id", id)
    try {
        const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        }
    })
        return res.json({status:201, data:user, msg:"user found"})
    } catch (error) {
        return res.status(500).json({ error: "Failed to get users" });
    }

}


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
//                 id: 'asc'
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

export const deleteUser = async (req:Request, res:Response) => {
    const { id } = req.params
    
    const values = await prisma.user.delete({
        where: {
           id:Number(id)
       }
    })
    res.json({status:200, data:values , msg:"user deleted"})
    
}


export const updateUser = async (req: Request, res: Response) => {
    
    const { id } = req.params;
    
    const { name, email, address } = req.body;
 
    const values = await prisma.user.update({
        data: {
            name:name,
            email:email,
            address:address
        },
        where: {
            id:Number(id)
        },
        select: {
            name: true,
            // id: true,
            email:true

        }
    })
    res.json({status:200, data:values , msg:"user deleted"})
    
}

export const getAllBasicPay = async (req: Request, res: Response) => {

    const { employeeId, amount, name } = req.body
    
    const posts = await prisma.basic_pay.create({
        data: {
            employeeId,
            amount,
            name
}
    })
    res.json(posts)
    
}


export const getAllDeduction = async (req: Request, res: Response) => {

    const { employeeId, amount, email, address } = req.body
    
    const posts = await prisma.deduction.create({
        data: {
            employeeId,
            amount,
            email,
            address
}
    })
    res.json(posts)
    
}

interface Data {
  id: number;
  basic_pay_amount: number;
  deduction_amount: number;
  total_amount: number;
}

export const getAllDatas = async (req: Request, res: Response) => {
    try {
      
    const rawData:Data[] = await prisma.$queryRaw`
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

    // Send the JSON response to the client
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
