import Editor from '@monaco-editor/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [defaultCode, setDefaultCode] = useState<string>();
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/dodgez/dodgez-dev/main/src/pages/index.tsx',
    )
      .then((response) => response.text())
      .then((data) => {
        setDefaultCode(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Dodgez Dev</title>
      </Head>
      {isLoading ? (
        'Loading...'
      ) : (
        <Editor
          defaultLanguage="javascript"
          defaultValue={defaultCode}
          height="100vh"
          theme="vs-dark"
        />
      )}
    </>
  );
}
