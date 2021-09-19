import { PrismaClient } from '@prisma/client';

export default function URL() {
  return <h1>URL Redirection</h1>;
}

export async function getServerSideProps({ params, res }) {
  const prisma = new PrismaClient();
  const { shortURL } = params;

  const link = await prisma.link.findUnique({
    where: { shortURL: shortURL },
  });

  if (!link) {
    return {
      redirect: { destination: '/' },
    };
  }

  return {
    redirect: { destination: link.URL },
  };
}
