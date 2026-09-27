import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(405).end();
    await serverAuth(req, res);

    const { query } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(200).json([]);
    }

    const movies = await prismadb.movie.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { genre: { contains: query, mode: 'insensitive' } }
        ]
      }
    });

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
