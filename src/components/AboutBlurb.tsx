import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function AboutBlurb() {
  return (
    <Stack spacing={4}>
      <Stack>
        <Typography variant="h4">Zachary Dodge</Typography>
        <em>Front End Engineer II at Amazon Web Services (AWS)</em>
      </Stack>
      <Typography>
        As a Front End Engineer II at Amazon Web Services with a Masters in
        Mathematics, I have 9+ years of experience in programming and
        engineering. I have designed and implemented crucial features for a
        website with tens of thousands of daily active users, including creation
        of a feature flag service, implementing smarter website routing logic,
        decreasing unit test time and development server startup time by 60% and
        50% and continuous integration and deployment for micro-frontend
        packages.
      </Typography>
    </Stack>
  );
}
