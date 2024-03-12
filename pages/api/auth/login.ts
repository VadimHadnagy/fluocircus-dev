'use server';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { jwtSecret } from '../../../config/config';

const prisma = new PrismaClient()

export default async function login(req: NextApiRequest, res: NextApiResponse) {      
    if (req.method !== 'POST') {
        return res.status(405).end(); // Méthode non autorisée
    }

    const { email, password } = req.body;
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user || !bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign({ userId: user.id, userName: user.username, userMail: user.email, userIsAdmin: user.isAdmin, userPassword: user.password }, 'IxAIXEdJZ3IRq1n2pZBRvT3V1EYMra04', { expiresIn: '2h' });
    
    res.status(200).setHeader("Set-Cookie", `token=${token}`).end();
}
