import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const experience = [
  {
    company: 'Amazon Web Services',
    endDate: 'Present',
    notes: [
      'Designed and implemented a feature framework for a website with thousands of users',
      'Implemented and used a feature flag framework for releasing dark mode for thousands of users',
      'Implemented smarter front-end routing logic to save 98% bandwidth on consecutive page loads',
      'Decreased unit test time for our website by 60% overall',
      'Decreased development server startup time by 50%',
      'Designed and implemented initial availability monitoring for an adjacent team',
      'Developed several front-end modules and components exposing information used by several hundred users per day',
      'Lead work to fix search results empowering several thousand users per day',
      'Designed and implemented a micro-frontend architecture for an internal service now extrapolated and used by 11 other tools',
      'Designed and implemented components exposing a unique view into data used by several hundred users per day',
      'Designed and implemented test automation for our micro-frontend packages',
    ],
    startDate: 'August 2021',
    title: 'Front End Engineer II',
  },
  {
    company: 'Cornerstone Systems Northwest Inc',
    endDate: 'August 2021',
    notes: [
      'Designed and implemented an architecture for a survey web application',
      'Designed visuals for the United States Preventative Services Task Force 2020 recommendation publication',
      'Updated and maintained the Tobacco Policy Effects site: https://tobaccopolicyeffects.org/',
    ],
    startDate: 'May 2019',
    title: 'Software Developer',
  },
  {
    company: 'Total Recall Inc',
    endDate: 'September 2015',
    notes: [
      'Designed, installed, tested, and maintained various software systems',
      'Programs created helped Total Recall Inc be more efficient and provided a better service for the customers',
      'Clearly and regularly communicated with management and technical support colleagues',
      'Tested, maintained and recommended software improvements to ensure strong functionality and optimization',
      'Independently installed, customized and integrated commercial software packages',
      'Facilitated root cause analysis of system issues',
      'Worked with experienced team members to conduct root cause analysis of issues, review new and existing code and/or perform unit testing',
      'Identified ideas to improve system performance',
      'Resolved complex technical design issues',
    ],
    startDate: 'June 2011',
    title: 'Software Developer',
  },
];

export default function Experience() {
  return (
    <Stack spacing={4}>
      {experience.map((experience) => (
        <Stack key={experience.company} spacing={1}>
          <Typography variant="h5">{experience.company}</Typography>
          <Typography>{experience.title}</Typography>
          <em>
            {experience.startDate}&nbsp;-&nbsp;{experience.endDate}
          </em>
          <ul>
            {experience.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </Stack>
      ))}
    </Stack>
  );
}
