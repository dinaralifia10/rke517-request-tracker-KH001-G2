# Agent instructions for this teaching project

Read PROJECT_RULES.md and the assigned issue before editing. Work on one issue at a time on a named branch. Explain the plan to the student, then edit the repository directly. Run npm test and report the actual command, result and any unexecuted checks. Add meaningful feature tests in new tests/*.test.js files. Do not weaken or delete baseline tests, change fixtures, remove validation to get green checks, or claim a check ran when it did not.

Use synthetic records only. No patient records, credentials, paid dependencies, remote data services, database or deployment. Preserve function contracts and the simple Node/browser setup. No package installation is needed.

Do not commit to main after the initial import. Do not force-push, rewrite history, approve your own work, merge pull requests or publish a release. Commit and push to the task branch only when the student authorizes it. Link the issue in the pull request. Leave review and merging to a different human group member.

Do not alter .github/workflows/checks.yml, package.json, server.mjs or tests/baseline.test.js for feature work. A provider-specific agent integration may add separate configuration after human review, but must preserve Project checks. This file is guidance, not an enforced permission control. If your harness does not load AGENTS.md, the student must attach these instructions explicitly or put an equivalent reference in that harness's supported instruction file.
