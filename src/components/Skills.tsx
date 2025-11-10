export default function Skills() {
  const skills = [
    'TypeScript',
    'React',
    'Git',
    'Bazel',
    'Playwright',
    'Stripe',
    'CI/CD pipelines',
    'AWS CloudFront',
    'AWS Lambda',
    'GraphQL',
    'Python',
    'Rust',
    'GitHub',
  ];

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Tech & Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            key={skill}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
