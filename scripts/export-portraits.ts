import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import index from "./export-portraits.html";

const outDir = join(import.meta.dir, "../src/assets/judges");
await mkdir(outDir, { recursive: true });

const saved = new Set<string>();
let markDone: () => void = () => {};
const finished = new Promise<void>(resolve => {
  markDone = resolve;
});

const server = Bun.serve({
  port: 3456,
  routes: {
    "/": index,
    "/save": {
      POST: async req => {
        const filename = req.headers.get("x-filename");
        if (!filename || !filename.endsWith(".png") || filename.includes("/")) {
          return new Response("bad filename", { status: 400 });
        }
        await Bun.write(join(outDir, filename), Buffer.from(await req.arrayBuffer()));
        saved.add(filename);
        return new Response("ok");
      },
    },
    "/done": {
      POST: () => {
        markDone();
        return new Response("ok");
      },
    },
  },
});

console.log(`Export server at ${server.url}`);
await finished;
server.stop();
if (saved.size !== 4) {
  throw new Error(`Expected 4 portraits, saved ${saved.size}`);
}
console.log(`Wrote ${[...saved].sort().join(", ")}`);
