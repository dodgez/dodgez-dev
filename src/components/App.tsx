import Layout from '@/components/Layout';
import Index from '@/pages/Index';
import WordleFilter from '@/pages/WordleFilter';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import type { AwsRumConfig } from 'aws-rum-web';
import { AwsRum } from 'aws-rum-web';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

try {
  const config: AwsRumConfig = {
    allowCookies: true,
    enableXRay: false,
    endpoint: 'https://dataplane.rum.us-west-2.amazonaws.com',
    guestRoleArn:
      'arn:aws:iam::181966156320:role/dodgez.dev-RUM-UnauthenticatedRole',
    identityPoolId: 'us-west-2:525094d5-bebc-4263-a3a5-2b47344037af',
    sessionSampleRate: 1,
    telemetries: ['errors', 'http', 'performance'],
  };

  const APPLICATION_ID = '3fc06966-b1de-43eb-ad4a-332d91ba3746';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = 'us-west-2';

  if (window.location.hostname === 'www.dodgez.dev') {
    new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config);
  }
} catch {
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

const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Index />
      </Layout>
    ),
    path: '/',
  },
  {
    element: (
      <Layout>
        <WordleFilter />
      </Layout>
    ),
    path: '/wordle-filter',
  },
]);

export default function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: '#f5f5f5',
      },
      info: {
        main: '#f5f5f5',
      },
      mode: 'light',
      primary: {
        main: '#113946',
      },
      secondary: {
        main: '#5c431f',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Analytics />
    </ThemeProvider>
  );
}
