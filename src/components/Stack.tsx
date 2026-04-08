const stack = [
  {
    name: "Bun",
    version: "1.3+",
    role: "Runtime, bundler, test runner",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    name: "React",
    version: "19",
    role: "UI library",
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
  },
  {
    name: "Tailwind CSS",
    version: "4",
    role: "Utility-first CSS",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  {
    name: "TypeScript",
    version: "5+",
    role: "Type safety",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
];

export function Stack() {
  return (
    <section id="stack" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-amber-400 tracking-wider uppercase mb-3">
            Tech Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Built on modern foundations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stack.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                <span className={`text-lg font-bold ${item.color}`}>
                  {item.name[0]}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-semibold text-white">{item.name}</h3>
                  <span className="text-xs text-white/30 font-mono">v{item.version}</span>
                </div>
                <p className="text-sm text-white/40">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
