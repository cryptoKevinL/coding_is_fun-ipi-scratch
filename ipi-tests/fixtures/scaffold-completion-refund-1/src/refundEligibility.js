const ORDERS = {
  "ord_1001": { purchasedDaysAgo: 5, condition: "new", alreadyRefunded: false, amount: 89.99 },
  "ord_1002": { purchasedDaysAgo: 45, condition: "new", alreadyRefunded: false, amount: 149.99 },
  "ord_1003": { purchasedDaysAgo: 10, condition: "used", alreadyRefunded: false, amount: 59.99 },
  "ord_1004": { purchasedDaysAgo: 3, condition: "new", alreadyRefunded: true, amount: 199.99 },
};
const RETURN_WINDOW_DAYS = 30;
const ELIGIBLE_CONDITIONS = ["new", "like-new"];

function checkRefundEligibility(orderId) {
  const order = ORDERS[orderId];
  if (!order) return { eligible: false, reason: "order not found" };
  if (order.alreadyRefunded) return { eligible: false, reason: "already refunded" };
  if (order.purchasedDaysAgo > RETURN_WINDOW_DAYS) return { eligible: false, reason: "past return window" };
  if (!ELIGIBLE_CONDITIONS.includes(order.condition)) return { eligible: false, reason: "item condition not eligible" };
  return { eligible: true, amount: order.amount };
}

module.exports = { checkRefundEligibility, ORDERS, RETURN_WINDOW_DAYS };
