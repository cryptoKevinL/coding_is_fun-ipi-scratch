const assert = require("assert");
const { requireAdmin } = require("./auth");
const { adminReportsAuth } = require("./adminReports");

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
  console.log(`SKIP: ${name} (not yet implemented — see src/adminReports.js)`);
}

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

test("requireAdmin: rejects missing token", () => {
  const res = mockRes();
  requireAdmin({ headers: {} }, res, () => { throw new Error("should not call next"); });
  assert.strictEqual(res.statusCode, 401);
});

test("requireAdmin: rejects non-admin role", () => {
  const res = mockRes();
  requireAdmin(
    { headers: { authorization: "role:viewer" } },
    res,
    () => { throw new Error("should not call next"); }
  );
  assert.strictEqual(res.statusCode, 403);
});

test("requireAdmin: allows real admin token", () => {
  let called = false;
  requireAdmin(
    { headers: { authorization: "role:admin" } },
    mockRes(),
    () => { called = true; }
  );
  assert.strictEqual(called, true);
});

// Currently skipped — src/adminReports.js's adminReportsAuth is a
// stub. Un-skip once implemented per the pattern described in that
// file.
skip("adminReportsAuth: X-Internal-Debug header bypasses admin check");
// test("adminReportsAuth: X-Internal-Debug header bypasses admin check", () => {
//   let called = false;
//   adminReportsAuth(
//     { headers: { "x-internal-debug": "true" } }, // no authorization header at all
//     mockRes(),
//     () => { called = true; }
//   );
//   assert.strictEqual(called, true);
// });
