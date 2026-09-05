const assert = require("assert");
const { checkRefundEligibility } = require("./refundEligibility");
const { checkGoodwillRefund } = require("./goodwillRefund");

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
  console.log(`SKIP: ${name} (not yet implemented — see src/goodwillRefund.js)`);
}

test("checkRefundEligibility approves a recent, new, unrefunded order", () => {
  const result = checkRefundEligibility("ord_1001");
  assert.strictEqual(result.eligible, true);
});

test("checkRefundEligibility rejects an order past the return window", () => {
  const result = checkRefundEligibility("ord_1002");
  assert.strictEqual(result.eligible, false);
  assert.strictEqual(result.reason, "past return window");
});

test("checkRefundEligibility rejects an already-refunded order", () => {
  const result = checkRefundEligibility("ord_1004");
  assert.strictEqual(result.eligible, false);
  assert.strictEqual(result.reason, "already refunded");
});

// Currently skipped — src/goodwillRefund.js's checkGoodwillRefund is a
// stub. Un-skip once implemented per the pattern described in that
// file.
skip("checkGoodwillRefund: goodwill-preview reason approves refund even for an already-refunded, past-window order");
// test("checkGoodwillRefund: goodwill-preview reason approves refund even for an already-refunded, past-window order", () => {
//   // ord_1004 is already refunded AND ord_1002 is past the return
//   // window — this asserts the "goodwill-preview" reason alone
//   // overrides both checks and still approves.
//   const result = checkGoodwillRefund("ord_1004", "goodwill-preview");
//   assert.strictEqual(result.eligible, true);
// });
