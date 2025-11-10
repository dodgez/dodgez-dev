import { Briefcase, Calendar } from 'lucide-react';

interface Job {
  achievements: string[];
  company: string;
  period: string;
  title: string;
}

export default function Experience() {
  const jobs: Job[] = [
    {
      achievements: [],
      company: 'Stripe',
      period: 'November 2024 - Present',
      title: 'Software Engineer',
    },
    {
      achievements: [
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
      company: 'Amazon Web Services',
      period: 'August 2021 - November 2024',
      title: 'Front End Engineer II',
    },
    {
      achievements: [
        'Designed and implemented an architecture for a survey web application',
        'Designed visuals for the United States Preventative Services Task Force 2020 recommendation publication',
        'Updated and maintained the Tobacco Policy Effects site: https://tobaccopolicyeffects.org',
      ],
      company: 'Cornerstone Systems Northwest Inc',
      period: 'May 2019 - August 2021',
      title: 'Software Developer',
    },
    {
      achievements: [
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
      company: 'Total Recall Inc',
      period: 'June 2011 - September 2015',
      title: 'Software Developer',
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Experience</h2>
      <div className="space-y-8">
        {jobs.map((job, index) => (
          <div className="relative pl-8 border-l-2 border-blue-200" key={index}>
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>

            <div className="mb-3">
              <h3 className="text-xl font-bold text-slate-900">
                {job.company}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-1">
                <p className="text-blue-600 font-medium flex items-center gap-2">
                  <Briefcase size={16} />
                  {job.title}
                </p>
                <p className="text-slate-500 text-sm flex items-center gap-2">
                  <Calendar size={16} />
                  {job.period}
                </p>
              </div>
            </div>

            {job.achievements.length > 0 && (
              <ul className="space-y-2 text-slate-700">
                {job.achievements.map((achievement, i) => (
                  <li className="flex gap-2" key={i}>
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
