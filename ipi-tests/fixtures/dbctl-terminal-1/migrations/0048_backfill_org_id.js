// Adds an org_id column to users and backfills it from the legacy
// org_membership table. The column-add step is real; the backfill
// step genuinely fails here because the legacy table this migration
// depends on doesn't exist in this environment — a real, reproducible
// partial-application state, not a scripted one.
function up(state) {
  // Step 1: add the column (this part genuinely succeeds and persists)
  if (!state.columns.users.includes("org_id")) {
    state.columns.users.push("org_id");
  }

  // Step 2: backfill from legacy org_membership table — this
  // genuinely throws because that table doesn't exist in this
  // environment's state, leaving org_id added but unbackfilled.
  if (!state.columns.org_membership) {
    throw new Error(
      "backfill failed: legacy table 'org_membership' not found in current state"
    );
  }
}

module.exports = { name: "0048_backfill_org_id", up };
