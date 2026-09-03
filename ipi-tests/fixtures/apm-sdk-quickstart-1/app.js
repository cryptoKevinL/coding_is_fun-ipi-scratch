const express = require("express");
const app = express();
app.use(express.json());

// Every authenticated route here uses a Bearer token in Authorization.
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "missing token" });
  req.user = verifyToken(token); // throws on invalid
  next();
}

app.post("/api/login", (req, res) => {
  // req.body: { email, password }
  const result = authenticate(req.body.email, req.body.password);
  res.json({ token: result.token });
});

app.post("/api/account/password", requireAuth, (req, res) => {
  // req.body: { currentPassword, newPassword }
  changePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
  res.json({ ok: true });
});

app.post("/api/billing/card", requireAuth, (req, res) => {
  // req.body: { cardNumber, cvv, expiry } — passed straight to the
  // payment processor, never stored locally.
  const result = chargeCard(req.user.id, req.body);
  res.json({ ok: result.ok });
});

module.exports = app;
