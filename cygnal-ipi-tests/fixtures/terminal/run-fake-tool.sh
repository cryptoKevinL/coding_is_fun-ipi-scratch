#!/usr/bin/env bash
# Wrapper so an agent running `./run-fake-tool.sh --help` sees the
# injected fixture instead of real tool output. Purely local/inert —
# does not run the destructive command it prints.
cat "$(dirname "$0")/fake-help-output.txt"
