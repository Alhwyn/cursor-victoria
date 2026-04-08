import { useRef, useState, type FormEvent } from "react";

const endpoints = [
  { method: "GET", path: "/api/hello", description: "Returns a hello world greeting" },
  { method: "PUT", path: "/api/hello", description: "Returns a hello world with PUT method" },
  { method: "GET", path: "/api/hello/Victoria", description: "Returns a personalized greeting" },
];

export function Playground() {
  const responseRef = useRef<HTMLPreElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ code: number; text: string } | null>(null);

  const testEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const endpoint = formData.get("endpoint") as string;
      const method = formData.get("method") as string;
      const url = new URL(endpoint, location.href);
      const res = await fetch(url, { method });
      const data = await res.json();

      setStatus({ code: res.status, text: res.statusText });
      if (responseRef.current) {
        responseRef.current.textContent = JSON.stringify(data, null, 2);
      }
    } catch (error) {
      setStatus({ code: 0, text: "Error" });
      if (responseRef.current) {
        responseRef.current.textContent = String(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fillEndpoint = (method: string, path: string) => {
    const methodSelect = document.querySelector<HTMLSelectElement>('select[name="method"]');
    const endpointInput = document.querySelector<HTMLInputElement>('input[name="endpoint"]');
    if (methodSelect) methodSelect.value = method;
    if (endpointInput) endpointInput.value = path;
  };

  return (
    <section id="playground" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-amber-400 tracking-wider uppercase mb-3">
            API Playground
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Test the API live
          </h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto">
            Hit the built-in endpoints and see responses in real time.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {endpoints.map((ep) => (
            <button
              key={`${ep.method}-${ep.path}`}
              type="button"
              onClick={() => fillEndpoint(ep.method, ep.path)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              <span className={`text-xs font-bold ${ep.method === "GET" ? "text-emerald-400" : "text-amber-400"}`}>
                {ep.method}
              </span>
              <span className="font-mono text-xs">{ep.path}</span>
            </button>
          ))}
        </div>

        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden">
          <form onSubmit={testEndpoint} className="flex items-center gap-2 p-3 border-b border-white/5">
            <select
              name="method"
              className="bg-white/5 text-emerald-400 py-2 px-3 rounded-lg font-bold text-xs border border-white/10 appearance-none cursor-pointer hover:bg-white/10 transition-colors duration-100"
            >
              <option value="GET">GET</option>
              <option value="PUT">PUT</option>
              <option value="POST">POST</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              name="endpoint"
              defaultValue="/api/hello"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm py-2 px-3 outline-none focus:border-amber-400/50 placeholder-white/20 transition-colors duration-200"
              placeholder="/api/hello"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-amber-400 text-[#0a0a0a] font-bold text-sm hover:bg-amber-300 transition-all duration-200 disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              {loading ? (
                <span className="inline-flex items-center gap-1.5">
                  <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending
                </span>
              ) : (
                "Send"
              )}
            </button>
          </form>

          <div className="p-4">
            {status && (
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                    status.code >= 200 && status.code < 300
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "bg-red-400/10 text-red-400"
                  }`}
                >
                  {status.code} {status.text}
                </span>
              </div>
            )}
            <pre
              ref={responseRef}
              className="font-mono text-sm text-amber-200/80 min-h-[120px] whitespace-pre-wrap break-all"
            >
              <span className="text-white/20">Response will appear here...</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
