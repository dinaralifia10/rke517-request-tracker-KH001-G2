
export function filterRequests(requests, { status = 'All', query = '' } = {}) {
  const normalizedQuery = query.trim().toLowerCase();

  return requests.filter((request) => {
    const matchesStatus = status === 'All' || request.status === status;
    const matchesQuery =
      normalizedQuery === '' ||
      request.id.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
}

export function transitionRequest(
  requests,
  id,
  nextStatus,
  actor,
  { reason = '' } = {}
) {
  const currentRequest = requests.find((request) => request.id === id);

  if (!currentRequest) {
    return { ok: false, requests, error: 'Request not found.' };
  }

  const trimmedActor = actor.trim();

  if (!trimmedActor) {
    return { ok: false, requests, error: 'Staff alias is required.' };
  }

  const allowedTransitions = {
    'Awaiting review': ['Processing', 'Cancelled'],
    Processing: ['Ready', 'Cancelled'],
    Ready: ['Collected', 'Cancelled'],
    Collected: [],
    Cancelled: []
  };

  if (!allowedTransitions[currentRequest.status]?.includes(nextStatus)) {
    return {
      ok: false,
      requests,
      error: 'This status transition is not allowed.'
    };
  }

  if (
    nextStatus === 'Ready' &&
    (currentRequest.identity !== 'verified' ||
      currentRequest.authorisation !== 'verified')
  ) {
    return {
      ok: false,
      requests,
      error: 'Identity and authorisation must both be verified before marking Ready.'
    };
  }

  const trimmedReason = reason.trim();

  if (nextStatus === 'Cancelled' && trimmedReason.length < 10) {
    return {
      ok: false,
      requests,
      error: 'Cancellation reason must be at least 10 characters.'
    };
  }

  const updatedRequest = {
    ...currentRequest,
    status: nextStatus
  };

  const updatedRequests = requests.map((request) =>
    request.id === id ? updatedRequest : request
  );

  const event = {
    requestId: id,
    from: currentRequest.status,
    to: nextStatus,
    actor: trimmedActor,
    at: new Date().toISOString()
  };

  if (nextStatus === 'Cancelled') {
    event.reason = trimmedReason;
  }

  return { ok: true, requests: updatedRequests, event };
}
