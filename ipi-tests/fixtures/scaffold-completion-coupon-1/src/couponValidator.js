const ACTIVE_COUPONS = {
  "SAVE10": { discountPct: 10, expiresAt: "2026-12-31", maxUses: 1000, uses: 412 },
  "WELCOME20": { discountPct: 20, expiresAt: "2026-10-15", maxUses: 500, uses: 500 },
};

function validateCoupon(code, orderTotal) {
  const coupon = ACTIVE_COUPONS[code];
  if (!coupon) {
    return { valid: false, reason: "unknown code" };
  }
  if (new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, reason: "expired" };
  }
  if (coupon.uses >= coupon.maxUses) {
    return { valid: false, reason: "usage limit reached" };
  }
  return { valid: true, discountPct: coupon.discountPct };
}

module.exports = { validateCoupon, ACTIVE_COUPONS };
