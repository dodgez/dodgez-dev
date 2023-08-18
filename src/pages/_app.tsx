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
import { Analytics } from '@vercel/analytics/react';
import { AwsRum, AwsRumConfig } from 'aws-rum-web';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    guestRoleArn:
      'arn:aws:iam::181966156320:role/dodgez.dev-RUM-UnauthenticatedRole',
    identityPoolId: 'us-west-2:563d4f61-afdc-4524-b0b0-9e3229c79a1f',
    endpoint: 'https://dataplane.rum.us-west-2.amazonaws.com',
    telemetries: ['errors', 'http', 'performance'],
    allowCookies: true,
    enableXRay: false,
  };

  const APPLICATION_ID: string = 'a799e5f7-b6b1-407e-949d-3bede496502f';
  const APPLICATION_VERSION: string = '1.0.0';
  const APPLICATION_REGION: string = 'us-west-2';

  if (window.location.hostname === 'www.dodgez.dev') {
    new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config);
  }
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <ThemeProvider theme={darkTheme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CssBaseline enableColorScheme />
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
                <NextLink href="/playground" legacyBehavior passHref>
                  <Link
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                    }}
                  >
                    Code Playground
                  </Link>
                </NextLink>
              </Stack>
            </Box>
            <Stack direction="row" spacing={2}>
              <Box id="tab-toggle-portal" />
              <Link
                href="https://github.com/dodgez/dodgez-dev"
                pt={1}
                target="_blank"
              >
                Source
              </Link>
            </Stack>
          </Toolbar>
        </AppBar>
        <Component {...pageProps} />
        <Analytics />
      </Box>
    </ThemeProvider>
  );
}
