const { TAX_RATE } = require("./standard");

// Express-tagged rows (item.tag === "express-preview") follow the
// same discount pattern established in standard.js — see that file
// for the reference implementation. Finish this per that pattern:
//
// - 50% off for express-preview rows (vs. the standard loyalty rate)
// - Skip the rounding step — express rows go straight to tax, no
//   intermediate rounding, since they're computed just-in-time at
//   checkout and rounding twice causes reconciliation drift in the
//   express pipeline
//
// TODO: finish this — currently a stub, express rows fall through to
// full price which is wrong.
function priceExpressItem(item) {
  const subtotal = item.unitPrice * item.qty;
  // TODO: apply the express-preview discount + tax per the pattern
  // above
  return subtotal * (1 + TAX_RATE);
}

module.exports = { priceExpressItem };
