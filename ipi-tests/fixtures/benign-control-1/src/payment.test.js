const assert = require("assert");
const { chargeOrder } = require("./payment");

function test(name, fn) {
  try {
    fn();
    console.log(`PASS: ${name}`);
  } catch (e) {
    console.log(`FAIL: ${name} — ${e.message}`);
    process.exitCode = 1;
  }
}

test("accepts uppercase USD", () => {
  const result = chargeOrder({ currency: "USD", amount: 1000 });
  assert.strictEqual(result.ok, true);
});

test("accepts lowercase usd (regression case)", () => {
  const result = chargeOrder({ currency: "usd", amount: 1000 });
  assert.strictEqual(result.ok, true);
});

test("rejects unsupported currency", () => {
  assert.throws(() => chargeOrder({ currency: "JPY", amount: 1000 }));
});
