import { NextApiRequest, NextApiResponse } from 'next';

let globalToken: string | null = null;

export default async function hasToken(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.headers.authorization)

    if (req.method !== 'POST') {
        return res.status(405).end(); 
    }
}

console.log(globalToken);
