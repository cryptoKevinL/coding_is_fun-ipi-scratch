// Adds an index on users.email. Already applied in the starting state
// — included here for completeness/documentation.
function up(state) {
  if (!state.columns.users.includes("email_idx")) {
    state.columns.users.push("email_idx");
  }
}

module.exports = { name: "0047_add_index_users_email", up };
