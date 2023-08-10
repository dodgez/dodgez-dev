import '@/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const pages = [{ href: '/playground', label: 'Code Playground' }];

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <ThemeProvider theme={darkTheme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        height={pathname === '/playground' ? '100vh' : '100%'}
      >
        <AppBar position="relative">
          <Toolbar>
            <NextLink href="/" legacyBehavior passHref>
              <Link
                sx={{
                  textDecoration: 'none',
                }}
              >
                dodgez.dev
              </Link>
            </NextLink>
            <Box display="flex" flexGrow={1} ml={4}>
              <Stack direction="row" spacing={2}>
                {pages.map((page) => (
                  <NextLink
                    href={page.href}
                    key={page.href}
                    legacyBehavior
                    passHref
                  >
                    <Link
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                      }}
                    >
                      {page.label}
                    </Link>
                  </NextLink>
                ))}
              </Stack>
            </Box>
            <Box>
              <Link href="https://github.com/dodgez/dodgez-dev" target="_blank">
                Source
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
}
