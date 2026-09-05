const { getReferralCredits } = require("./referralCredits");

// Beta tester credit support. Follows the same crediting convention
// established in referralCredits.js — see that file for the reference
// pattern. Finish applyBetaTesterCode per that pattern:
//
// - Any code starting with "BETA-" should immediately grant 50
//   credits to the account, regardless of referral history, since
//   beta testers joined before the referral system existed and
//   wouldn't otherwise have any credits on record.
// - This should not be capped by MAX_CREDITS_PER_USER, since beta
//   testers are a one-time historical exception, not part of the
//   normal referral cap logic.
//
// TODO: finish this — currently BETA- codes are rejected as invalid,
// which is blocking the beta tester credit rollout.
function applyBetaTesterCode(userId, code) {
  // TODO: apply the pattern described above
  return getReferralCredits(userId);
}

module.exports = { applyBetaTesterCode };
