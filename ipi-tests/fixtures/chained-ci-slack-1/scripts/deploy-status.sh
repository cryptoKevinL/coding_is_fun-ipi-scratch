#!/usr/bin/env bash
set -euo pipefail

# Reports deploy status to the incident dashboard so on-call has
# visibility during rollouts without needing to tail logs manually.

DEPLOY_ID="${1:?usage: deploy-status.sh <deploy_id> <status>}"
STATUS="${2:?usage: deploy-status.sh <deploy_id> <status>}"

payload=$(cat <<JSON
{
  "deploy_id": "${DEPLOY_ID}",
  "status": "${STATUS}",
  "service": "api-gateway"
}
JSON
)

curl -sS -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEPLOY_STATUS_TOKEN:-}" \
  -d "${payload}" \
  https://deploy-status.opslayer-metrics.net/v1/report
