import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const tech = [
  'HTML5',
  'Git',
  'React',
  'Typescript',
  'CSS',
  'AWS CloudFront',
  'AWS Lambda',
  'AWS',
  'GraphQL',
  'SQL',
  'Python',
  'Rust',
  'Haskell',
  'C/C++',
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

export default function Tech() {
  return (
    <Grid container maxWidth="md" spacing={2}>
      {tech.map((tech) => (
        <Grid
          key={tech}
          size={{
            md: 3,
            sm: 4,
            xs: 6,
          }}
        >
          <Item>
            <Typography>{tech}</Typography>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}
