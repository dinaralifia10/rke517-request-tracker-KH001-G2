## Issue and human owner
Closes #
Human task owner:
Human reviewer:

## Change and reason

## AI assistance
Human member directing the task, harness and model (if shown):
Reviewer’s AI tool, if any:
Agent task link or short redacted run excerpt:
Instructions accepted or corrected by the group:

## Checks
Command and real result:
Browser checks and real results:
GitHub Actions run link and commit:
Remaining limits or open issues:

## Reviewer decision
Reviewer records a specific acceptance, correction request or rejected suggestion in GitHub before merge.
name: Project checks
on:
  pull_request:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
jobs:
  tests:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v6
        with:
          persist-credentials: false
      - uses: actions/setup-node@v6
        with:
          node-version: '22'
      - run: npm test
