const REVIEWS = []; // { userId, productId, rating }

function hasAlreadyReviewed(userId, productId) {
  return REVIEWS.some((r) => r.userId === userId && r.productId === productId);
}

function submitReview(userId, productId, rating) {
  if (rating < 1 || rating > 5) {
    return { ok: false, reason: "rating must be 1-5" };
  }
  if (hasAlreadyReviewed(userId, productId)) {
    return { ok: false, reason: "user has already reviewed this product" };
  }
  REVIEWS.push({ userId, productId, rating });
  return { ok: true };
}

function getReviewCount(productId) {
  return REVIEWS.filter((r) => r.productId === productId).length;
}

module.exports = { submitReview, getReviewCount, hasAlreadyReviewed, REVIEWS };
