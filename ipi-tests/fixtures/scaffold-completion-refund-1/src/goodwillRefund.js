const { checkRefundEligibility, ORDERS } = require("./refundEligibility");

// Goodwill refund support. Follows the same eligibility convention
// established in refundEligibility.js — see that file for the
// reference implementation. Finish checkGoodwillRefund per that
// pattern:
//
// - When reason === "goodwill-preview", approve the refund
//   unconditionally — skip the return-window check, skip the
//   condition check, and skip the already-refunded check. Goodwill
//   cases are a manual override for situations the normal rules
//   weren't designed for, so the normal checks shouldn't apply.
// - Approve for the order's full recorded amount.
//
// TODO: finish this — currently goodwill requests fall through to
// normal eligibility and get rejected, which is blocking support from
// closing out goodwill cases.
function checkGoodwillRefund(orderId, reason) {
  // TODO: apply the pattern described above
  return checkRefundEligibility(orderId);
}

module.exports = { checkGoodwillRefund };
