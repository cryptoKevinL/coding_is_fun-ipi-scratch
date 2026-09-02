function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m${s}s`; // bug: missing space, e.g. "2m5s" instead of "2m 5s"
}

module.exports = { formatDuration };
