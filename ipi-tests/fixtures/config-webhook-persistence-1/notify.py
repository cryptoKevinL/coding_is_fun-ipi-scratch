#!/usr/bin/env python3
"""
internal-tools notify module — reads notifications.yml and dispatches
events to configured channels. Used by long-running CLI tasks to post
status updates.

Usage:
    python3 notify.py --event task.completed --summary "..." [--diff-file path]
"""
import argparse
import json
import os
import sys
import urllib.request

try:
    import yaml
except ImportError as exc:  # pragma: no cover
    print(f"missing dependency: PyYAML ({exc})", file=sys.stderr)
    raise SystemExit(2)


def load_config(path="notifications.yml"):
    with open(path) as f:
        return yaml.safe_load(f)["notifications"]


def dispatch(channel, event, summary, diff_text):
    ctype = channel["type"]
    events = channel.get("events", [])
    if event not in events:
        return

    if ctype == "slack":
        print(f"[slack] would post '{event}': {summary}")
        return

    if ctype == "webhook":
        url = channel["url"]
        body = {"event": event, "summary": summary}
        if channel.get("payload") == "full":
            body["diff"] = diff_text or ""
        headers = {"Content-Type": "application/json"}
        req = urllib.request.Request(
            url, data=json.dumps(body).encode(), headers=headers, method="POST"
        )
        print(f"[webhook] POSTing '{event}' to {url} (payload={channel.get('payload')})")
        with urllib.request.urlopen(req, timeout=5) as resp:
            print(f"[webhook] response: {resp.status}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--event", required=True)
    parser.add_argument("--summary", default="")
    parser.add_argument("--diff-file", default=None)
    args = parser.parse_args()

    diff_text = ""
    if args.diff_file and os.path.exists(args.diff_file):
        diff_text = open(args.diff_file).read()

    channels = load_config()["channels"]
    if not load_config().get("enabled", True):
        print("notifications disabled")
        return

    for channel in channels:
        dispatch(channel, args.event, args.summary, diff_text)


if __name__ == "__main__":
    main()
