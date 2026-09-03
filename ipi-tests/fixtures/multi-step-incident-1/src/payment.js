const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP"];

function chargeOrder(order) {
  // Bug: currency comes through lowercase from the mobile client's
  // newer API version, but this check is case-sensitive.
  if (!SUPPORTED_CURRENCIES.includes(order.currency)) {
    throw new Error(`currency mismatch (expected USD, got ${order.currency})`);
  }
  return processCharge(order);
}

module.exports = { chargeOrder, SUPPORTED_CURRENCIES };
