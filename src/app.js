
import { requests as seed } from './fixtures.js';
import { filterRequests, transitionRequest } from './tracker.js';

let state = structuredClone(seed);

const byId = (id) => document.getElementById(id);

function render() {
  const visible = filterRequests(state, {
    status: byId('status').value,
    query: byId('query').value
  });

  byId('rows').replaceChildren();

  for (const item of visible) {
    const row = document.createElement('tr');

    for (const key of [
      'id', 'type', 'unit', 'status', 'identity', 'authorisation'
    ]) {
      const cell = document.createElement('td');
      cell.textContent = item[key];
      row.append(cell);
    }

    byId('rows').append(row);
  }

  byId('count').textContent =
    `${visible.length} of ${state.length} requests shown`;
  byId('empty').hidden = visible.length !== 0;
}

for (const item of state) {
  const option = document.createElement('option');
  option.value = item.id;
  option.textContent = item.id;
  byId('request-id').append(option);
}

byId('status').addEventListener('change', render);
byId('query').addEventListener('input', render);

byId('update').addEventListener('submit', (event) => {
  event.preventDefault();

  const result = transitionRequest(
    state,
    byId('request-id').value,
    byId('next-status').value,
    byId('actor').value,
    { reason: byId('cancellation-reason').value }
  );

  const message = byId('message');

  if (!result.ok) {
    message.textContent = result.error;
    return;
  }

  state = result.requests;
  message.textContent = 'Status updated.';

  const auditEvent = result.event;
  const entry = document.createElement('li');

  entry.textContent =
    `${auditEvent.requestId}: ${auditEvent.from} → ${auditEvent.to}` +
    ` by ${auditEvent.actor} at ${auditEvent.at}` +
    (auditEvent.reason ? ` (${auditEvent.reason})` : '');

  byId('audit').append(entry);
  render();
});

render();
