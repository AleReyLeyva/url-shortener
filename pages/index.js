import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home({ HOST }) {
  const [loading, setLoading] = useState(false);
  const [URL, setURL] = useState('');
  const [shortURL, setShortURL] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post('/api/shorten', {
      URL,
    });
    setLoading(false);
    setShortURL(data.shortURL);
  }

  return (
    <div className="container">
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="URL Shortener" />
        <link rel="icon" href="/link.svg" />
      </Head>

      <form onSubmit={handleSubmit}>
        <h1 className="title">URL Shortener 🔗</h1>
        <input
          type="text"
          placeholder="URL"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
          className="input"
        />
        <button className="btn" onClick={handleSubmit}>
          Shorten URL
        </button>

        {shortURL ? (
          <Link href={`/${shortURL}`}>
            <a className="output">
              {HOST}/{shortURL}
            </a>
          </Link>
        ) : null}
        {loading ? <p className="output">Loading...</p> : null}
      </form>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  return {
    props: {
      HOST: req.headers.host,
    },
  };
}
