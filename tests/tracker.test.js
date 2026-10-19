
import test from 'node:test';
import assert from 'node:assert/strict';
import { requests } from '../src/fixtures.js';
import { filterRequests, transitionRequest } from '../src/tracker.js';

test('six synthetic IDs are distinct', () => {
  assert.equal(requests.length, 6);
  assert.equal(new Set(requests.map((r) => r.id)).size, 6);
});

test('unfiltered list returns all requests without changing input', () => {
  const before = structuredClone(requests);
  assert.deepEqual(filterRequests(requests), requests);
  assert.deepEqual(requests, before);
});

test('search trims spaces and ignores case', () => {
  const result = filterRequests(requests, { query: ' req-104 ' });
  assert.deepEqual(result.map((r) => r.id), ['REQ-104']);
});

test('search matches a partial request ID', () => {
  const result = filterRequests(requests, { query: '104' });
  assert.deepEqual(result.map((r) => r.id), ['REQ-104']);
});

test('status and query filters work together', () => {
  const result = filterRequests(requests, {
    status: 'Processing',
    query: ' req-10 '
  });
  assert.deepEqual(result.map((r) => r.id), [
    'REQ-101',
    'REQ-102',
    'REQ-103'
  ]);
});

test('no matching request returns an empty list', () => {
  assert.deepEqual(filterRequests(requests, { query: 'REQ-999' }), []);
});

test('unknown request is rejected without an event', () => {
  const result = transitionRequest(requests, 'REQ-999', 'Processing', 'Student-A');
  assert.equal(result.ok, false);
  assert.equal(result.event, undefined);
});

test('same-status transition is rejected', () => {
  const result = transitionRequest(requests, 'REQ-101', 'Processing', 'Student-A');
  assert.equal(result.ok, false);
  assert.equal(result.event, undefined);
  assert.equal(result.requests, requests);
});

test('Ready is rejected when identity is unverified', () => {
  const result = transitionRequest(requests, 'REQ-102', 'Ready', 'Student-A');
  assert.equal(result.ok, false);
});

test('Ready is rejected when authorisation is pending', () => {
  const result = transitionRequest(requests, 'REQ-103', 'Ready', 'Student-A');
  assert.equal(result.ok, false);
});

test('Collected is a terminal status', () => {
  const result = transitionRequest(requests, 'REQ-105', 'Processing', 'Student-A');
  assert.equal(result.ok, false);
  assert.equal(result.event, undefined);
});

test('blank staff alias is rejected', () => {
  const result = transitionRequest(requests, 'REQ-101', 'Cancelled', '   ', {
    reason: 'Duplicate request'
  });
  assert.equal(result.ok, false);
});

test('valid cancellation reason is trimmed and recorded', () => {
  const result = transitionRequest(requests, 'REQ-101', 'Cancelled', ' Student-A ', {
    reason: '  Duplicate request  '
  });
  assert.equal(result.ok, true);
  assert.equal(result.event.actor, 'Student-A');
  assert.equal(result.event.reason, 'Duplicate request');
});

test('cancellation reason shorter than 10 characters is rejected', () => {
  const result = transitionRequest(requests, 'REQ-101', 'Cancelled', 'Student-A', {
    reason: 'short'
  });
  assert.equal(result.ok, false);
  assert.equal(result.event, undefined);
});

test('exactly 10 characters after trimming is accepted', () => {
  const result = transitionRequest(requests, 'REQ-101', 'Cancelled', 'Student-A', {
    reason: '  1234567890  '
  });
  assert.equal(result.ok, true);
  assert.equal(result.event.reason, '1234567890');
});


test('non-cancellation event does not contain a reason', () => {
  const result = transitionRequest(requests, 'REQ-101', 'Ready', 'Student-A', {
    reason: 'A reason that must not be saved'
  });

  assert.equal(result.ok, true);
  assert.equal(Object.hasOwn(result.event, 'reason'), false);
});

