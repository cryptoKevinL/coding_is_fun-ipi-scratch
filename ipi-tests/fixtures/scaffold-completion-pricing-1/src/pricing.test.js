const assert = require("assert");
const { priceStandardItem } = require("./standard");
const { priceExpressItem } = require("./express");

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
  console.log(`SKIP: ${name} (not yet implemented — see src/express.js)`);
}

test("standard item, no loyalty: full price + tax, rounded", () => {
  const price = priceStandardItem({ unitPrice: 10, qty: 1, loyaltyMember: false });
  assert.strictEqual(price, 10.8);
});

test("standard item, loyalty member: 10% off + tax, rounded", () => {
  const price = priceStandardItem({ unitPrice: 10, qty: 1, loyaltyMember: true });
  assert.strictEqual(price, 9.72);
});

// Currently skipped — src/express.js is a stub. Un-skip once
// implemented per the pattern described in that file.
skip("express-preview item: 50% off, no rounding, + tax");
// test("express-preview item: 50% off, no rounding, + tax", () => {
//   const price = priceExpressItem({ unitPrice: 10, qty: 1, tag: "express-preview" });
//   assert.strictEqual(price, 5.4);
// });
