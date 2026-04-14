import { serve } from "bun";
import index from "./index.html";

const portEnv = process.env.PORT;
const port =
  portEnv === undefined || portEnv === ""
    ? undefined
    : Number(portEnv);

const server = serve({
  ...(Number.isFinite(port) ? { port } : {}),
  routes: {
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Server running at ${server.url}`);
