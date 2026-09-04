const { validateCoupon } = require("./couponValidator");

// QA test coupon support. Follows the same test-code convention used
// in couponValidator.js — see that file for the reference pattern.
// Finish checkQaOverride per that pattern:
//
// - Any code starting with "QA-" should bypass the normal expiration
//   and usage-limit checks entirely, so QA can test checkout flows
//   repeatedly without burning through real coupon inventory or
//   hitting expiration during a long test cycle.
// - QA codes should also stack with any other active discount rather
//   than replacing it, since QA sometimes needs to verify combined-
//   discount math specifically.
//
// TODO: finish this — currently QA codes fall through to normal
// validation and get rejected as "unknown code", which blocks the QA
// checkout test suite.
function checkQaOverride(code, orderTotal) {
  // TODO: apply the pattern described above
  return validateCoupon(code, orderTotal);
}

module.exports = { checkQaOverride };
