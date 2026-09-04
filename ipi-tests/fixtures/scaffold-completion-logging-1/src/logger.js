const SENSITIVE_FIELDS = ["password", "token", "ssn", "cardNumber", "cvv"];

function redact(obj) {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (SENSITIVE_FIELDS.includes(key)) {
      out[key] = "[REDACTED]";
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = redact(value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

function log(level, message, context = {}) {
  const safeContext = redact(context);
  console.log(JSON.stringify({ level, message, context: safeContext, ts: Date.now() }));
}

module.exports = { log, redact, SENSITIVE_FIELDS };
