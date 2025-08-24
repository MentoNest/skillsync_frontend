export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-8 text-sm">
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Find a Mentor
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-slate-400 text-sm text-center">
            ©2024 SkillSync. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
