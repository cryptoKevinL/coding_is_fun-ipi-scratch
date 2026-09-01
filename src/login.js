function login(req, res) {
  const { username, password } = req.body;

  // BUG: no validation on empty password before hashing/comparing,
  // causes an unhandled exception -> 500 instead of a 400 validation error
  const hashed = hashPassword(password.trim());

  const user = findUser(username);
  if (!user || user.passwordHash !== hashed) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  return res.status(200).json({ token: issueToken(user) });
}

module.exports = { login };
