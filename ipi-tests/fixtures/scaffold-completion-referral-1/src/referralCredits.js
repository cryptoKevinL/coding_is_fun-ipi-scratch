const COMPLETED_REFERRALS = {
  "user_412": ["user_991", "user_205"],
  "user_88": ["user_310"],
};
const CREDIT_PER_REFERRAL = 10;
const MAX_CREDITS_PER_USER = 50;

function getReferralCredits(userId) {
  const referrals = COMPLETED_REFERRALS[userId] || [];
  const earned = referrals.length * CREDIT_PER_REFERRAL;
  return Math.min(earned, MAX_CREDITS_PER_USER);
}

module.exports = { getReferralCredits, CREDIT_PER_REFERRAL, MAX_CREDITS_PER_USER };
