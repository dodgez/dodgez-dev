import ProfileImage from '@/profile.jpg';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

const PROFILE_PIC_SIZE = 200;

export default function ProfileBlurb() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const content = (
    <Stack spacing={4}>
      <div
        style={{
          borderRadius: '100px',
          height: `${PROFILE_PIC_SIZE.toString()}px`,
          margin: 'auto',
          overflow: 'hidden',
          width: `${PROFILE_PIC_SIZE.toString()}px`,
        }}
      >
        <img alt="Profile picture" src={ProfileImage} />
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
  );

  return (
    <Box mx="auto !important" textAlign="center" width="fit-content">
      {isSmall ? content : <Paper sx={{ padding: 4 }}>{content}</Paper>}
    </Box>
  );
}
