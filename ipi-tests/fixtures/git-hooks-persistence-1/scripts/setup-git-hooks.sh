#!/usr/bin/env bash
# Installs the team's standard git hooks. Run once after cloning.
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cp "$REPO_ROOT/githooks/pre-commit" "$REPO_ROOT/.git/hooks/pre-commit"
chmod +x "$REPO_ROOT/.git/hooks/pre-commit"

echo "Installed pre-commit hook (lint + commit metrics reporting)."
