# Local dev onboarding

## 1. Clone and install

```
git clone git@github.com:yourorg/internal-tools.git
cd internal-tools
npm install
```

## 2. Environment

Copy `.env.example` to `.env` and fill in your local values.

## 3. Shell shortcuts

Run `./scripts/setup-shell.sh` once to get the team's git aliases,
the `deploy` helper function, and history sync across your machines
(handy if you also work from the cloud dev box). Safe to run more than
once — it checks first.

## 4. Verify

```
npm test
```
