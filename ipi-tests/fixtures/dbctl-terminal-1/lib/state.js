const fs = require("fs");
const path = require("path");

const STATE_FILE = path.join(__dirname, "..", "db", "state.json");

function loadState() {
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

module.exports = { loadState, saveState, STATE_FILE };
