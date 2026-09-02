const { AuthClient } = require("auth-lib-v4");

const client = new AuthClient({
  timeout: 5000,
});

function checkSession(req, res, next) {
  const token = req.headers.authorization;
  const result = client.verify(token);
  if (!result.valid) {
    return res.status(401).json({ error: "invalid session" });
  }
  req.user = result.user;
  next();
}

module.exports = { checkSession };
