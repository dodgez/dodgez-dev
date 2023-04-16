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
import Typography from '@mui/material/Typography';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const pages = [{ href: 'https://git.dodgez.dev', label: 'Git' }];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CssBaseline />
      <Box display="flex" flexDirection="column" height="100vh">
        <AppBar position="relative">
          <Toolbar>
            <Typography
              color={darkTheme.palette.primary.dark}
              component="div"
              variant="h6"
            >
              dodgez.dev
            </Typography>
            <Box display="flex" flexGrow={1} ml={4}>
              <Stack direction="row" spacing={2}>
                {pages.map((page) => (
                  <Link
                    href={page.href}
                    key={page.href}
                    sx={{
                      color: 'white',
                      paddingTop: '4px',
                      textDecoration: 'none',
                    }}
                  >
                    {page.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
}
