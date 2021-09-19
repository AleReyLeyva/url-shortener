// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  let { URL } = req.body;
  const shortURL = Math.random().toString(36).substr(2, 6);

  if (!URL.includes('http')) {
    URL = 'http://' + URL;
  }
  console.log(URL);

  try {
    let link = await prisma.link.findUnique({
      where: {
        URL: URL,
      },
    });

    if (link) {
      return res.json(link);
    }

    link = {
      URL,
      shortURL,
    };

    const newLink = await prisma.link.create({
      data: link,
    });

    return res.json(newLink);
  } catch (e) {
    return res.json({ message: e.message });
  }
}
