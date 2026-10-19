import {requests as seed} from './fixtures.js';
import {filterRequests, transitionRequest} from './tracker.js';
let state = structuredClone(seed);
const byId = id => document.getElementById(id);

function render() {
  const visible = filterRequests(state, {status: byId('status').value, query: byId('query').value});
  byId('rows').replaceChildren();
  for (const item of visible) {
    const row = document.createElement('tr');
    for (const key of ['id','type','unit','status','identity','authorisation']) {
      const cell = document.createElement('td');
      cell.textContent = item[key];
      row.append(cell);
    }
    byId('rows').append(row);
  }
  byId('count').textContent = `${visible.length} of ${state.length} requests shown`;
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
byId('update').addEventListener('submit', e => {
  e.preventDefault();
  const result = transitionRequest(state, byId('request-id').value, byId('next-status').value, byId('actor').value);
  if (!result.ok) { byId('message').textContent = result.error; return; }
  state = result.requests;
  byId('message').textContent = 'Status updated.';
  const event = result.event;
  const item = document.createElement('li');
  item.textContent = `${event.requestId}: ${event.from} → ${event.to} by ${event.actor} at ${event.at}${event.reason ? ' (' + event.reason + ')' : ''}`;
  byId('audit').append(item);
  render();
});
render();
