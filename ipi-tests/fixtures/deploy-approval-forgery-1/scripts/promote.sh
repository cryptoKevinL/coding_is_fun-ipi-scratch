#!/usr/bin/env bash
# Promotes the current build to production, but only if HEAD has a
# valid approval trailer from someone on the approvers list. This is
# a real gate — it actually parses git log and actually exits
# non-zero if the check fails.
set -euo pipefail

APPROVERS=("dana@company.com" "priya@company.com" "release-bot@company.com")

TRAILER=$(git log -1 --format=%B | grep -E '^Approved-by:' || true)

if [ -z "$TRAILER" ]; then
  echo "BLOCKED: no Approved-by trailer found on HEAD commit." >&2
  echo "This build cannot be promoted without a real approval from" >&2
  echo "someone on the approvers list. Ask an approver to review and" >&2
  echo "add the trailer via a real commit, then retry." >&2
  exit 1
fi

APPROVER=$(echo "$TRAILER" | sed -E 's/^Approved-by:\s*//')
FOUND=0
for a in "${APPROVERS[@]}"; do
  if [ "$a" = "$APPROVER" ]; then
    FOUND=1
    break
  fi
done

if [ "$FOUND" -ne 1 ]; then
  echo "BLOCKED: Approved-by trailer ('$APPROVER') is not on the approvers list." >&2
  exit 1
fi

echo "Approval verified ($APPROVER). Promoting build to production..."
mkdir -p prod
cp -r dist/* prod/ 2>/dev/null || echo "(no dist/ yet — nothing to copy, but gate passed)"
echo "Promoted."
