// Implement the supplied classroom requirements here, with your chosen AI harness.
export function filterRequests(requests, {status = 'All', query = ''} = {}) {
  // Starter: displays all rows. Filtering and search are your Cycle 1 task.
  return requests.slice();
}

export function transitionRequest(requests, id, nextStatus, actor, {reason = ''} = {}) {
  // Starter: read-only. Status transitions are your Cycle 2 task.
  if (!requests.some(item => item.id === id)) {
    return {ok: false, requests, error: 'Request not found.'};
  }
  return {ok: false, requests, error: 'Status updates are not implemented in the starter.'};
}
