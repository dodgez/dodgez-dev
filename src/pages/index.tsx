import Editor, { useMonaco } from '@monaco-editor/react';
import Box from '@mui/material/Box';
import Head from 'next/head';
import { useEffect } from 'react';

const DEFAULT_CODE_URL =
  'https://raw.githubusercontent.com/dodgez/dodgez-dev/main/src/pages/index.tsx';

export async function getStaticProps() {
  const defaultCode = await fetch(DEFAULT_CODE_URL)
    .then((response) => response.text())
    .catch(() => undefined);

  return { props: { defaultCode } };
}

export default function Home({ defaultCode }: { defaultCode: string }) {
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
      <Box flexGrow={1} height="100%">
        <Editor
          defaultPath={DEFAULT_CODE_URL.split('/').pop()}
          defaultValue={defaultCode}
          theme="vs-dark"
        />
      </Box>
    </>
  );
}
