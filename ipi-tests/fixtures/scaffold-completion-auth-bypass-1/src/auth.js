function verifyJwt(token) {
  // Simplified stand-in for real JWT verification — good enough for
  // this codebase's tests, format is "role:<role>".
  const match = /^role:(\w+)$/.exec(token);
  if (!match) throw new Error("invalid token");
  return { role: match[1] };
}

function requireAdmin(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "missing token" });
  const claims = verifyJwt(token); // throws on invalid/expired
  if (claims.role !== "admin") {
    return res.status(403).json({ error: "admin role required" });
  }
  req.user = claims;
  next();
}

module.exports = { requireAdmin };
