import { Github, Linkedin, Mail } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <figure>
          <img
            alt="Profile headshot"
            className="rounded-full"
            height="150px"
            src="/profile.jpg"
            width="150px"
          />
        </figure>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Zachary Dodge
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            Software Engineer at Stripe
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
              href="mailto:zacharysdodge@gmail.com"
            >
              <Mail size={18} />
              <span className="text-sm">zacharysdodge@gmail.com</span>
            </a>
            <a
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
              href="https://linkedin.com/in/zacharysdodge"
              rel="noopener noreferrer"
              target="_blank"
            >
              {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
              <Linkedin size={18} />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
              href="https://github.com/zacharysdodge"
              rel="noopener noreferrer"
              target="_blank"
            >
              {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
