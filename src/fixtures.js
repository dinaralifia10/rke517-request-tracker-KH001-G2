// Synthetic requests only. These are not patient records.
export const requests = [
  {
    id: 'REQ-101',
    type: 'Visit summary',
    unit: 'General clinic',
    status: 'Processing',
    identity: 'verified',
    authorisation: 'verified'
  },
  {
    id: 'REQ-102',
    type: 'Attendance letter',
    unit: 'Dental clinic',
    status: 'Processing',
    identity: 'unverified',
    authorisation: 'verified'
  },
  {
    id: 'REQ-103',
    type: 'Visit summary',
    unit: 'General clinic',
    status: 'Processing',
    identity: 'verified',
    authorisation: 'pending'
  },
  {
    id: 'REQ-104',
    type: 'Referral copy',
    unit: 'Dental clinic',
    status: 'Collected',
    identity: 'verified',
    authorisation: 'verified'
  },
  {
    id: 'REQ-105',
    type: 'Attendance letter',
    unit: 'General clinic',
    status: 'Collected',
    identity: 'verified',
    authorisation: 'verified'
  },
  {
    id: 'REQ-106',
    type: 'Referral copy',
    unit: 'General clinic',
    status: 'Cancelled',
    identity: 'unverified',
    authorisation: 'pending'
  }
];
