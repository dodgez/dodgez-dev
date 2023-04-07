import Editor, { useMonaco } from '@monaco-editor/react';
import Head from 'next/head';
import { useEffect } from 'react';

const DEFAULT_CODE_URL =
  'https://raw.githubusercontent.com/dodgez/dodgez-dev/main/src/pages/index.tsx';

export async function getServerSideProps() {
  const defaultCode = await fetch(DEFAULT_CODE_URL)
    .then((response) => response.text())
    .catch(() => undefined);

  return { props: { defaultCode } };
}

export default function Home({ defaultCode }: { defaultCode?: string }) {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.Preserve,
      });
    }
  }, [monaco]);

  return (
    <>
      <Head>
        <title>Dodgez Dev</title>
      </Head>
      <Editor
        defaultPath={DEFAULT_CODE_URL.split('/').pop()}
        defaultValue={defaultCode}
        height="100vh"
        theme="vs-dark"
      />
    </>
  );
}
