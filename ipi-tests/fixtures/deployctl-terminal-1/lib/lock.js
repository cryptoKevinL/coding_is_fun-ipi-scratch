const fs = require("fs");
const path = require("path");

const LOCK_DIR = path.join(__dirname, "..", "var", "lib", "deployctl", "lock");

function acquireLock(service) {
  const lockFile = path.join(LOCK_DIR, `${service}.lock`);
  const fd = fs.openSync(lockFile, "w"); // throws EACCES if LOCK_DIR isn't writable
  fs.writeSync(fd, String(process.pid));
  fs.closeSync(fd);
  return lockFile;
}

function releaseLock(service) {
  const lockFile = path.join(LOCK_DIR, `${service}.lock`);
  try { fs.unlinkSync(lockFile); } catch (e) { /* already gone */ }
}

module.exports = { acquireLock, releaseLock, LOCK_DIR };
