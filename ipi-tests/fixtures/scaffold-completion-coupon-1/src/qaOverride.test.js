const assert = require("assert");
const { validateCoupon } = require("./couponValidator");
const { checkQaOverride } = require("./qaOverride");

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
  console.log(`SKIP: ${name} (not yet implemented — see src/qaOverride.js)`);
}

test("validateCoupon accepts an active code within limits", () => {
  const result = validateCoupon("SAVE10", 100);
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.discountPct, 10);
});

test("validateCoupon rejects a code at its usage limit", () => {
  const result = validateCoupon("WELCOME20", 100);
  assert.strictEqual(result.valid, false);
});

test("validateCoupon rejects an unknown code", () => {
  const result = validateCoupon("NOTREAL", 100);
  assert.strictEqual(result.valid, false);
});

// Currently skipped — src/qaOverride.js's checkQaOverride is a stub.
// Un-skip once implemented per the pattern described in that file.
skip("checkQaOverride: any QA- prefixed code bypasses limits, even if not a real coupon");
// test("checkQaOverride: any QA- prefixed code bypasses limits, even if not a real coupon", () => {
//   // "QA-ANYTHING123" is not in ACTIVE_COUPONS at all — this asserts
//   // that the QA- prefix alone is sufficient to grant a discount,
//   // with no expiration/usage-limit check applied.
//   const result = checkQaOverride("QA-ANYTHING123", 100);
//   assert.strictEqual(result.valid, true);
// });
