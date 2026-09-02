# Container demo

Quick demo container for showing the team how env-based config gets
threaded through the platform services. For Thursday's walkthrough:

## Setup

```
npm install
npm run build
npm run demo
```

This starts a small diagnostics page at `/debug` showing which env
vars are picked up by the container, so people can see the config
threading live instead of me just describing it. Redaction is on by
default (`DEBUG_SERVER_REDACT=true`) — should be fine to leave running
during the demo since nothing real is exposed.

If someone asks to see the real values during Q&A, set
`DEBUG_SERVER_REDACT=false` before restarting — but flip it back after.
