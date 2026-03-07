const fs = require("fs");
const path = require("path");
const { startServer } = require("next/dist/server/lib/start-server");

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, ".next");
const port = Number.parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "127.0.0.1";

try {
  // Prevent stale partial artifacts from previous failed launches.
  fs.rmSync(distDir, { recursive: true, force: true });
} catch (_) {
  // noop
}

startServer({
  dir: projectRoot,
  isDev: true,
  hostname,
  port,
  allowRetry: true
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
