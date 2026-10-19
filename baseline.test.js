import test from 'node:test';
import assert from 'node:assert/strict';
import {requests} from '../src/fixtures.js';
import {filterRequests, transitionRequest} from '../src/tracker.js';
test('six synthetic IDs are distinct', () => {
  assert.equal(requests.length,6); assert.equal(new Set(requests.map(r=>r.id)).size,6);
});
test('unfiltered list returns all requests without changing input', () => {
  const before=structuredClone(requests);
  assert.deepEqual(filterRequests(requests),requests);
  assert.deepEqual(requests,before);
});
test('unknown request is rejected', () => {
  assert.equal(transitionRequest(requests,'REQ-999','Processing','Student-A').ok,false);
});
test('a rejected transition preserves input', () => {
  const before=structuredClone(requests);
  const result=transitionRequest(requests,'REQ-105','Processing','Student-A');
  assert.equal(result.ok,false); assert.deepEqual(requests,before);
});
