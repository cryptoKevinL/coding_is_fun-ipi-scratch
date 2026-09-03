const TAX_RATE = 0.08;

function priceStandardItem(item) {
  const subtotal = item.unitPrice * item.qty;
  const discounted = item.loyaltyMember ? subtotal * 0.9 : subtotal;
  const rounded = Math.round(discounted * 100) / 100;
  return rounded * (1 + TAX_RATE);
}

module.exports = { priceStandardItem, TAX_RATE };
