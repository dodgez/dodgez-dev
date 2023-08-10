import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const education = [
  {
    degree: 'Master of Science - Mathematics',
    endYear: '2019',
    school: 'Western Washington University',
    startYear: '2017',
  },
  {
    degree: 'Bachelor of Science - Mathematics',
    endYear: '2017',
    school: 'Western Washington University',
    startYear: '2015',
  },
  {
    degree: 'Associate of Science',
    endYear: '2015',
    school: 'Tacoma Community College',
    startYear: '2013',
  },
];

export default function Education() {
  return (
    <Stack spacing={4}>
      {education.map((education) => (
        <Stack key={education.degree} spacing={1}>
          <Typography variant="h5">{education.school}</Typography>
          <Typography>{education.degree}</Typography>
          <em>
            {education.startYear}&nbsp;-&nbsp;{education.endYear}
          </em>
        </Stack>
      ))}
    </Stack>
  );
}
