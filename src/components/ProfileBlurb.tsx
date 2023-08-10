import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const PROFILE_PIC_SIZE = 200;

export default function ProfileBlurb() {
  return (
    <Stack spacing={4} sx={{ textAlign: 'center' }}>
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
        <Typography>Zachary Dodge</Typography>
        <Typography>Front End Engineer II at AWS</Typography>
        <Typography>zacharysdodge&nbsp;(at)&nbsp;gmail.com</Typography>
        <Link
          href="https://www.linkedin.com/in/zachary-s-dodge"
          sx={{ textDecoration: 'none' }}
        >
          LinkedIn
        </Link>
        <Link href="https://github.com/dodgez" sx={{ textDecoration: 'none' }}>
          GitHub
        </Link>
      </Stack>
    </Stack>
  );
}
