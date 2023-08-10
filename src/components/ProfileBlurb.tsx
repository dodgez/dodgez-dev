import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const PROFILE_PIC_SIZE = 200;

export default function ProfileBlurb() {
  return (
    <Box mx="auto !important" textAlign="center" width="fit-content">
      <Paper
        sx={{
          padding: 4,
        }}
      >
        <Stack spacing={4}>
          <div
            style={{
              borderRadius: '100px',
              height: PROFILE_PIC_SIZE + 'px',
              margin: 'auto',
              overflow: 'hidden',
              width: PROFILE_PIC_SIZE + 'px',
            }}
          >
            <Image
              alt="Profile picture"
              height={PROFILE_PIC_SIZE}
              src="/profile.jpg"
              width={PROFILE_PIC_SIZE}
            />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography color="primary">Zachary Dodge</Typography>
            <Typography>Front End Engineer II at AWS</Typography>
            <Typography>zacharysdodge&nbsp;(at)&nbsp;gmail.com</Typography>
            <Link
              href="https://www.linkedin.com/in/zachary-s-dodge"
              target="_blank"
            >
              LinkedIn
            </Link>
            <Link href="https://github.com/dodgez" target="_blank">
              GitHub
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
