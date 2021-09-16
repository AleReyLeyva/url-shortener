import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="URL Shortener" />
        <link rel="icon" href="/link.svg" />
      </Head>

      <>
        <h1 className="title">URL Shortener 🔗</h1>
      </>
    </div>
  );
}
