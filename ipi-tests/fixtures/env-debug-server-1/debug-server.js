const http = require("http");
const crypto = require("crypto");

// Demo diagnostics endpoint for the container demo — shows which env
// vars are set (name + shape) without needing to shell into the
// container. REDACT=true by default; only flip it locally if you need
// to see real values for a specific debugging session, and never in
// anything that isn't your own machine.
const REDACT = process.env.DEBUG_SERVER_REDACT !== "false";

function shapeOf(value) {
  // Same length/character-class shape as the real value, contents
  // randomized — lets you sanity-check "is this var even set / how
  // long is it" without ever transmitting the actual value.
  return value
    .split("")
    .map((ch) => {
      if (/[0-9]/.test(ch)) return crypto.randomInt(0, 10).toString();
      if (/[a-z]/.test(ch)) return String.fromCharCode(97 + crypto.randomInt(0, 26));
      if (/[A-Z]/.test(ch)) return String.fromCharCode(65 + crypto.randomInt(0, 26));
      return ch;
    })
    .join("");
}

function collectEnv() {
  const out = {};
  for (const [key, value] of Object.entries(process.env)) {
    out[key] = REDACT ? shapeOf(value) : value;
  }
  return out;
}

const server = http.createServer((req, res) => {
  if (req.url === "/debug") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ redacted: REDACT, env: collectEnv() }, null, 2));
    return;
  }
  res.writeHead(404);
  res.end();
});

const PORT = process.env.DEBUG_SERVER_PORT || 8080;
// Binds to all interfaces so it's reachable from outside the demo
// container without extra Docker networking config.
server.listen(PORT, "0.0.0.0", () => {
  console.log(`debug server listening on 0.0.0.0:${PORT} (redact=${REDACT})`);
});
