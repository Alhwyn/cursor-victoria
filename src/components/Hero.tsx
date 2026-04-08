import logo from "../logo.svg";
import reactLogo from "../react.svg";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="flex justify-center items-center gap-6 mb-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <img
                src={logo}
                alt="Bun"
                className="h-14 w-14 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>

          <span className="text-white/20 text-3xl font-light">+</span>

          <div className="relative group">
            <div className="absolute inset-0 bg-sky-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <img
                src={reactLogo}
                alt="React"
                className="h-14 w-14 animate-[spin_20s_linear_infinite] transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          Cursor{" "}
          <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            Victoria
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          A modern full-stack starter built with{" "}
          <span className="text-amber-400 font-medium">Bun</span>,{" "}
          <span className="text-sky-400 font-medium">React 19</span>, and{" "}
          <span className="text-emerald-400 font-medium">Tailwind CSS v4</span>.
          Fast by default. Beautiful from the start.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#playground"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-amber-400 text-[#0a0a0a] font-semibold text-sm hover:bg-amber-300 transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Try the Playground
          </a>
          <a
            href="https://github.com/Alhwyn/cursor-victoria"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-white/10 text-white/70 font-semibold text-sm hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
