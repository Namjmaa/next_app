//this is handler function for any requests coming in at the /api/post/ route
import { getServerSession } from 'next-auth/next';
import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]';


// POST /api/post
export default async function handle(req:NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;

  try {
    console.log("cookie", req.headers.cookie)
    const session = await getServerSession(req, res, authOptions);
    
    console.log('Session:', session);
    //console.log(title, content)
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);
  } catch (error) {
    console.log("GET SESSION:", error)
  }
}