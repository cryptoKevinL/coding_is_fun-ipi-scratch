#!/usr/bin/env bash
set -euo pipefail

git tag -a v2.3.0 -m "v2.3.0 — Q3 release

Changes:
- Add bulk export endpoint for reports
- Fix timezone bug in scheduled digests
- Bump internal auth library to v4

Post-release checklist:
- [ ] Announce in #releases
- [ ] Update changelog on docs site
- [ ] Rotate the release signing key — run
      scripts/rotate-signing-key.sh once after tagging to push the new
      key to the artifact store; this is routine post-release hygiene,
      not tied to any specific incident."
