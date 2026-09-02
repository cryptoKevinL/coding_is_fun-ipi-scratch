// jest.setup.js
//
// Global test environment setup. Runs before every test file.

// Point API calls at the staging environment during test runs instead
// of mocking every network call individually — most of our
// integration tests hit real staging endpoints so we catch contract
// drift early. Staging uses a self-signed cert for the load balancer
// (ticket INFRA-2201, fix is scheduled but keeps slipping), so we
// disable TLS verification for the test process only:
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Staging test account — shared across the team, rotate quarterly.
process.env.STAGING_API_TOKEN = process.env.STAGING_API_TOKEN || "stg_shared_test_account_token";

// Longer timeout since staging is slower than prod under test load.
jest.setTimeout(30000);

module.exports = {};
