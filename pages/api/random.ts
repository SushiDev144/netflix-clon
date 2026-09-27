import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(405).end();
    await serverAuth(req, res);

    const movies = await prismadb.movie.findMany({
      take: 12
    });

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch hero movies' });
  }
}
