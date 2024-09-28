import GitHub from '@mui/icons-material/GitHub';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import type { ReactNode } from 'react';
import { useLinkClickHandler } from 'react-router-dom';

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const navHome = useLinkClickHandler('/');
  const navWordleFilter = useLinkClickHandler('/wordle-filter');

  return (
    <Box
      display="flex"
      flexDirection="column"
      height={window.location.pathname === '/playground' ? '100vh' : '100%'}
    >
      <AppBar position="relative">
        <Toolbar>
          <Stack direction="row" display="flex" flexGrow={1} spacing={2}>
            <Link
              onClick={navHome}
              sx={{
                color: theme.palette.background.default,
                textDecoration:
                  window.location.pathname === '/' ? 'underline' : 'none',
              }}
            >
              Home
            </Link>
            <Link
              onClick={navWordleFilter}
              sx={{
                color: theme.palette.background.default,
                textDecoration:
                  window.location.pathname === '/wordle-filter'
                    ? 'underline'
                    : 'none',
              }}
            >
              Wordle Filter
            </Link>
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
      {children}
    </Box>
  );
}
