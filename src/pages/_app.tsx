import '@/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import GitHub from '@mui/icons-material/GitHub';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
    identityPoolId: 'us-west-2:525094d5-bebc-4263-a3a5-2b47344037af',
    endpoint: 'https://dataplane.rum.us-west-2.amazonaws.com',
    telemetries: ['errors', 'http', 'performance'],
    allowCookies: true,
    enableXRay: false,
  };

  const APPLICATION_ID: string = '3fc06966-b1de-43eb-ad4a-332d91ba3746';
  const APPLICATION_VERSION: string = '1.0.0';
  const APPLICATION_REGION: string = 'us-west-2';

  if (window.location.hostname === 'www.dodgez.dev') {
    new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config);
  }
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#113946',
      },
      secondary: {
        main: '#5c431f',
      },
      info: {
        main: '#f5f5f5',
      },
      background: {
        default: '#f5f5f5',
      },
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
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
            <Stack direction="row" display="flex" flexGrow={1} spacing={2}>
              <NextLink href="/" legacyBehavior passHref>
                <Link
                  sx={{
                    color: lightTheme.palette.background.default,
                    textDecoration: pathname === '/' ? 'underline' : 'none',
                  }}
                >
                  Home
                </Link>
              </NextLink>
              <NextLink href="/wordle-filter" legacyBehavior passHref>
                <Link
                  sx={{
                    color: lightTheme.palette.background.default,
                    textDecoration:
                      pathname === '/wordle-filter' ? 'underline' : 'none',
                  }}
                >
                  Wordle Filter
                </Link>
              </NextLink>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box id="tab-toggle-portal" />
              <IconButton
                aria-label="github source"
                onClick={() =>
                  window.open('https://github.com/dodgez/dodgez-dev', '_blank')
                }
                role="link"
              >
                <GitHub color="info" />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Analytics />
      </Box>
    </ThemeProvider>
  );
}
