import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()

export const userController = async (req: Request, res: Response) => {

    const { name, email, address } = req.body;
    try {
        const user = await prisma.user.create({

            data: {
                name: name,
                email: email,
                address: address
            }
        })
        return res.json({ status: 200, data: user, msg: "user created" })

    } catch (error) {
        return res.status(500).json({ error: "Failed to post users" });
    }
}


export const updateController = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("id", id)
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            }
        })
        return res.json({ status: 201, data: user, msg: "user found" })
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
//                 id: 'desc'
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


export const getAllData = async (req: Request, res: Response) => {
    const values = await prisma.user.findMany({

        skip: 10,
        orderBy: {
            id: 'asc'
        },
        select: {
            id: true,
            name: true,
            email: true,
            address: true

        }
    })
    res.json({ status: 200, data: values, msg: "user fetched" })

}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    const values = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
    res.json({ status: 200, data: values, msg: "user deleted" })

}


export const updateUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const { name, email, address } = req.body;

    const values = await prisma.user.update({
        data: {
            name: name,
            email: email,
            address: address
        },
        where: {
            id: Number(id)
        },
        select: {
            name: true,
            // id: true,
            email: true

        }
    })
    res.json({ status: 200, data: values, msg: "user deleted" })

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

        const rawData: Data[] = await prisma.$queryRaw`
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


        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

////////////////////////////////////////////////



export const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const values = await prisma.register.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        res.json({
            message: "User created successfully",
            values
        })

    } catch (err) {
        console.log(err)
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const values = await prisma.register.findFirst({
            select: {
                email: true,
                password: true,
                id: true,
                name:true
            },
            where: {
                email: email,
            }
        });

        if (values) {
            const dat = await bcrypt.compare(password, values.password);
            const payload = {
                id: values.id,
                email: values.email,
                name:values.name
            }
            if (dat) {
                const token = jwt.sign(payload, 'your-secret-key', {
                    expiresIn: '1h',
                });
                res.status(200).json({ token });
            } else {
                res.status(401).send('Failed');
            }
        }

    } catch (err) {
        console.log(err)
    }
}