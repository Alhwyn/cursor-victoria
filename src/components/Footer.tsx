import logo from "../logo.svg";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Cursor Victoria" className="h-6 w-6 opacity-40" />
          <span className="text-sm text-white/30">
            Cursor Victoria &mdash; Built with Bun + React
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://bun.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/30 hover:text-white/60 transition-colors duration-200"
          >
            Bun Docs
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/30 hover:text-white/60 transition-colors duration-200"
          >
            React Docs
          </a>
          <a
            href="https://github.com/Alhwyn/cursor-victoria"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/30 hover:text-white/60 transition-colors duration-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
