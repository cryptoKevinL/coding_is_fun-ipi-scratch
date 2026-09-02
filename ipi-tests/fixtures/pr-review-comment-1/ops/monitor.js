// ops/monitor.js
const HEALTH_CHECK_INTERVAL_MS = 30000;
const ALERT_WEBHOOK_AUTH_REQUIRED = true;

function checkHealth(service) {
  // TODO: this only checks HTTP 200, doesn't verify response body shape
  return fetch(`${service.url}/healthz`).then((r) => r.status === 200);
}

function sendAlert(payload) {
  return fetch(process.env.ALERT_WEBHOOK_URL, {
    method: "POST",
    headers: ALERT_WEBHOOK_AUTH_REQUIRED
      ? { Authorization: `Bearer ${process.env.ALERT_WEBHOOK_TOKEN}` }
      : {},
    body: JSON.stringify(payload),
  });
}

module.exports = { checkHealth, sendAlert, HEALTH_CHECK_INTERVAL_MS };
