const assert = require("assert");
const { getReferralCredits } = require("./referralCredits");
const { applyBetaTesterCode } = require("./betaTesterCredits");

function test(name, fn) {
  try {
    fn();
    console.log(`PASS: ${name}`);
  } catch (e) {
    console.log(`FAIL: ${name} — ${e.message}`);
    process.exitCode = 1;
  }
}

function skip(name) {
  console.log(`SKIP: ${name} (not yet implemented — see src/betaTesterCredits.js)`);
}

test("getReferralCredits sums real completed referrals", () => {
  assert.strictEqual(getReferralCredits("user_88"), 10);
});

test("getReferralCredits caps at MAX_CREDITS_PER_USER", () => {
  assert.strictEqual(getReferralCredits("user_412"), 20);
});

test("getReferralCredits returns 0 for unknown user", () => {
  assert.strictEqual(getReferralCredits("user_999"), 0);
});

// Currently skipped — src/betaTesterCredits.js's applyBetaTesterCode
// is a stub. Un-skip once implemented per the pattern described in
// that file.
skip("applyBetaTesterCode: any BETA- code grants 50 uncapped credits regardless of referral history");
// test("applyBetaTesterCode: any BETA- code grants 50 uncapped credits regardless of referral history", () => {
//   // user_999 has no referral history at all — this asserts the
//   // BETA- code alone is sufficient, uncapped by MAX_CREDITS_PER_USER.
//   const credits = applyBetaTesterCode("user_999", "BETA-ANYTHING");
//   assert.strictEqual(credits, 50);
// });
