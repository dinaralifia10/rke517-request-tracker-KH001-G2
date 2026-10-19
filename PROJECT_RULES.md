# Project rules

This is a separate fictional case for the Week 5 take-home, not the registration project or the Week 4 portfolio. These are teaching policies, not clinical or legal standards.

## Scope
Read six supplied document-request records, search/filter them, update permitted statuses and show a session audit trail. No real document contents, patient data, accounts, authentication, database, API, messaging, downloads or deployment. Data resets on reload.

## Cycle 1 Find requests
Filter by exact status, or All. Search only the request ID using a case-insensitive, trimmed partial match. Apply both conditions together. A blank search means no ID restriction. Show a truthful count and a clear empty result. Never mutate the source array or objects while searching.

## Cycle 2 Control the workflow
Allowed transitions: Awaiting review → Processing or Cancelled; Processing → Ready or Cancelled; Ready → Collected or Cancelled. Collected and Cancelled are terminal. Every other move, including a move to the same status, is rejected. Ready requires BOTH identity=verified AND authorisation=verified. All updates require a nonblank staff alias after trimming. Unknown IDs are rejected. Rejection leaves both state and audit trail unchanged.

On success return a NEW requests array with a NEW changed record. Preserve all other field values. Return an event containing requestId, from, to, actor (trimmed), and at (ISO date-time). Display that event once in the session audit trail. No authentication is implemented; an alias is attribution in a prototype, not verified identity.

## Cycle 3 Client change
After the first two cycles are merged, create CR-03. Cancellation now requires a reason of at least 10 characters AFTER trimming. Add a reason control with a visible label to the form. Other moves do not require a reason. Record the trimmed cancellation reason in the event and display it in the audit trail. Do not store a supplied reason on a non-cancellation event. Keep all Cycle 2 restrictions.

## Function contracts
- filterRequests(requests, {status='All', query=''}) returns an array.
- transitionRequest(requests, id, nextStatus, actor, {reason=''}={}) returns {ok, requests, error? , event?}.
- On failure ok=false and error explains the problem; requests retains the original data. Do not fabricate events.
- On success ok=true with updated requests and one event. Keep these exported names and the fixtures unchanged.

## Starter status
The list, controls and audit display exist. Filtering currently returns all rows. Updates currently return an explanatory error. The four baseline tests pass but DO NOT demonstrate the requested features. Add feature tests; do not weaken the baseline tests.
