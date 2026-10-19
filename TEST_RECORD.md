# Test record
Keep each run tied to a branch/commit. Run the browser checks yourself. Automated function tests do not prove the controls are wired correctly.

| ID | Input or starting state | Expected result | Actual result | Pass or fail | Commit and evidence |
|---|---|---|---|---|---|
| T01 | All; empty search | Six requests | | | |
| T02 | Processing; query " req-10 " | REQ-102 and REQ-103 only | | | |
| T03 | All; query "req-104" | REQ-104 only | | | |
| T04 | Ready; query "REQ-999" | Zero and clear empty message | | | |
| T05 | REQ-101 to Processing; Student-A | Success and one audit event | | | |
| T06 | REQ-102 to Ready; Student-A | Rejected because identity is unverified | | | |
| T07 | REQ-103 to Ready; Student-A | Rejected because authorisation is pending | | | |
| T08 | REQ-104 to Collected; Student-A | Success and one audit event | | | |
| T09 | REQ-105 to Processing | Rejected because Collected is terminal | | | |
| T10 | REQ-101 to Processing; blank alias | Rejected without mutation or event | | | |
| T11 | REQ-101 to Cancelled; reason "short" | Rejected after CR-03 | | | |
| T12 | REQ-101 to Cancelled; reason "  Duplicate request  " | Success; event reason is "Duplicate request" | | | |

Reset the page between independent cases. Add at least one boundary test your group designs, with its rationale. For example, reason length is measured after trimming. Cover both functions in automated tests as well as these browser checks.
