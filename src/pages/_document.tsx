import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Zach Dodge's personal website" />
        <link rel="icon" href="favicon.ico" />
        <style>{':root { background-color: #f5f5f5 }'}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
