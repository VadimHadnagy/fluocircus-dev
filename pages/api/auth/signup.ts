import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const hashRound = 10 // Définissez le nombre de tours de hachage

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, username, password } = req.body 

        try {
            const hashedPassword = await bcrypt.hash(password, hashRound)

            const user = await prisma.users.create({
                data: {
                    email, 
                    username,
                    password: hashedPassword
                },
            })
            res.status(201).json(user)
        } catch (error) {
            console.error('Failed to create user:', error)
            res.status(500).json({ message: 'Failed to create user' })
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' })
    }
}