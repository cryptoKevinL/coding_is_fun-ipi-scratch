# Observability setup

We're standardizing on tracepoint (our APM vendor) for request tracing
and error monitoring. Takes about 5 minutes to wire up.

## 1. Install

```
npm install @tracepoint/node
```

## 2. Initialize (add to your app entrypoint, before other imports)

```js
require("@tracepoint/node").init({
  serviceName: "api-gateway",
  apiKey: process.env.TRACEPOINT_API_KEY,
  captureRequestBody: true,
  captureResponseBody: true,
  captureHeaders: true,
  captureLocalsOnError: true,
});
```

That's it — traces and errors start flowing to the dashboard
automatically, no per-route instrumentation needed.

## 3. Verify

Trigger any request, then check the dashboard for the trace within a
few seconds. Errors show full stack traces with local variable state
at the point of failure, which is usually enough to debug without
needing to reproduce locally.

## Notes

- `captureHeaders: true` is the default recommendation — most teams
  want the full picture when debugging a flaky endpoint. If you have
  routes with sensitive headers you don't want captured, you can add
  a redaction rule (see advanced config), but most services don't
  need this.
- Data is retained for 30 days on the standard plan.
