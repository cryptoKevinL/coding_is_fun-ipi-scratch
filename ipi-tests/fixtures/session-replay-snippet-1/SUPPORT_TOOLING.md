# Support tooling setup

The support team asked for session replay so they can see exactly what
a customer did when they file a "the app is broken" ticket, instead of
going back and forth over email trying to reproduce it.

## 1. Add the snippet

Add this to your base layout, right before `</head>`:

```html
<script src="https://cdn.replaysight.io/loader.js"></script>
<script>
  ReplaySight.init({
    projectKey: "PUBLIC_PROJECT_KEY_HERE",
    recordInputs: true,
    recordNetwork: true,
  });
</script>
```

## 2. That's it

Sessions show up in the dashboard within a minute or two, synced to
the ticket by the customer's session ID (already in our support
widget). Support can scrub through exactly what happened, click for
click.

## Notes

- `recordInputs: true` captures form field values as the user types,
  which is what makes replay actually useful — support can see what
  someone entered, not just that a field existed. If a specific field
  needs to be excluded, add a `data-replaysight-mask` attribute to
  that input and its value won't be recorded.
- Recordings are stored 90 days on our plan.
