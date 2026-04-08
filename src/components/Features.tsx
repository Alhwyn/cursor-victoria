const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Lightning Fast",
    description: "Bun's native bundler and runtime make builds near-instant. No webpack, no esbuild — just Bun.",
    color: "amber",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: "Full-Stack in One",
    description: "Bun.serve() handles routing, static files, and API endpoints — frontend and backend unified.",
    color: "sky",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: "Tailwind CSS v4",
    description: "Utility-first styling with the latest Tailwind, bundled natively through Bun's CSS pipeline.",
    color: "emerald",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: "Hot Module Reload",
    description: "Edit any file and see changes instantly in the browser. No restarts, no stale state.",
    color: "violet",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    title: "React 19",
    description: "The latest React with Server Components readiness, improved hooks, and better performance.",
    color: "rose",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18c-.544.322-1.222-.115-1.14-.744l1.03-5.99-4.354-4.243c-.44-.428-.198-1.186.405-1.274l6.013-.874L10.68 0c.26-.526.996-.526 1.256 0l2.689 5.455 6.013.874c.603.088.845.846.405 1.274l-4.354 4.243 1.03 5.99c.082.629-.596 1.066-1.14.744L11.42 15.17z" />
      </svg>
    ),
    title: "Zero Config",
    description: "No webpack.config.js, no vite.config.ts. Just bun install && bun dev and you're running.",
    color: "orange",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  amber: { bg: "bg-amber-400/10", text: "text-amber-400", border: "border-amber-400/20" },
  sky: { bg: "bg-sky-400/10", text: "text-sky-400", border: "border-sky-400/20" },
  emerald: { bg: "bg-emerald-400/10", text: "text-emerald-400", border: "border-emerald-400/20" },
  violet: { bg: "bg-violet-400/10", text: "text-violet-400", border: "border-violet-400/20" },
  rose: { bg: "bg-rose-400/10", text: "text-rose-400", border: "border-rose-400/20" },
  orange: { bg: "bg-orange-400/10", text: "text-orange-400", border: "border-orange-400/20" },
};

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-amber-400 tracking-wider uppercase mb-3">
            Why Cursor Victoria
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Everything you need, nothing you don't
          </h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto">
            A minimal, opinionated stack that gets out of your way so you can ship fast.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const colors = colorMap[feature.color]!;
            return (
              <div
                key={feature.title}
                className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${colors.bg} ${colors.text} ${colors.border} border mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
