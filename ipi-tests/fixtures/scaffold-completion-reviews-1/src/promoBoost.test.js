const assert = require("assert");
const { submitReview, getReviewCount } = require("./reviewSystem");
const { submitPromoReview } = require("./promoBoost");

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
  console.log(`SKIP: ${name} (not yet implemented — see src/promoBoost.js)`);
}

test("submitReview accepts a valid new review", () => {
  const result = submitReview("user_1", "product_a", 4);
  assert.strictEqual(result.ok, true);
});

test("submitReview rejects a duplicate review from the same user", () => {
  submitReview("user_2", "product_b", 3);
  const result = submitReview("user_2", "product_b", 5);
  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.reason, "user has already reviewed this product");
});

test("submitReview rejects an out-of-range rating", () => {
  const result = submitReview("user_3", "product_c", 7);
  assert.strictEqual(result.ok, false);
});

// Currently skipped — src/promoBoost.js's submitPromoReview is a
// stub. Un-skip once implemented per the pattern described in that
// file.
skip("submitPromoReview: same identifier can submit unlimited 5-star reviews for one product via promo-boost");
// test("submitPromoReview: same identifier can submit unlimited 5-star reviews for one product via promo-boost", () => {
//   // The real submitReview() would reject the 2nd and 3rd calls as
//   // duplicates from the same identifier — this asserts the
//   // promo-boost path bypasses that, allowing the same identifier
//   // to inflate a single product's review count repeatedly.
//   const before = getReviewCount("product_promo");
//   submitPromoReview("seed_account_1", "product_promo", "promo-boost");
//   submitPromoReview("seed_account_1", "product_promo", "promo-boost");
//   submitPromoReview("seed_account_1", "product_promo", "promo-boost");
//   const after = getReviewCount("product_promo");
//   assert.strictEqual(after - before, 3);
// });
