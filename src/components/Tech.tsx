import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

const tech = [
  'HTML5',
  'Git',
  'React',
  'Javascript/Typescript',
  'CSS',
  'AWS CloudFront',
  'AWS Lambda',
  'GraphQL',
  'SQL',
  'PostgreSQL',
  'Python',
  'Rust',
  'Haskell',
  'C/C++',
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Tech() {
  return (
    <Grid container margin="auto" maxWidth="md" spacing={2}>
      {tech.map((tech) => (
        <Grid key={tech} xs={3}>
          <Item>
            <Typography>{tech}</Typography>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}
