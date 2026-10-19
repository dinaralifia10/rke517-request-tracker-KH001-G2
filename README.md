# Clinic document request tracker

RKE517 KH001 Week 5 group take-home. New case, individually chosen AI harnesses, one GitHub repository and human review. Start with the student assignment PDF. Read PROJECT_RULES.md for the exact scope and contracts.

## Run
Use Node.js 22 or newer. Ask your harness to run `npm test` and `npm start` from this directory. There are no external dependencies and no npm install step. Open http://127.0.0.1:4173 in the same computer/environment as the server. For a cloud/IDE harness use its forwarded port or preview, if available; otherwise download the branch snapshot and run it locally for the browser check. The server binds to localhost. A cloud preview may require changing the listen host in a separate reviewed setup change; do not expose a server with real data.

The four baseline tests pass on the starter. They are smoke checks, not proof the requested features work. Filtering and state updates are intentionally unfinished. A browser screenshot of the starter is not completed work.

## Connect
Each member may use a different AI coding harness or model. All members work in the same GitHub repository and follow the same project rules and review process. Choose any capable local, IDE or cloud coding harness. The agent must read/edit these actual files, execute checks, and use authenticated Git or a GitHub integration to commit/push a branch. A manual human click to open the PR is allowed. Plain chat followed only by copying generated code does not demonstrate the required connected workflow.

Create a NEW private repository named rke517-request-tracker-KH001-G<number>. Add all group members and danielhappyg. This keeps the earlier registration exercise intact. A local harness can initialize Git and push the entire starter after you authorize the initial import to main. A cloud harness may need you to upload the unzipped contents through GitHub first. Verify .github/workflows/checks.yml, .github/pull_request_template.md and .gitignore are present too; hidden folders are part of the starter. Each member connects their chosen tool to this same repository. Record connection evidence for every tool used. Before starting a task, sync with current main and use a separate task branch.

Use your own authorized accounts. Nobody shares passwords or tokens. A human operator may run an authorized harness while the group plans/reviews; record who directed each task. Check access/usage limits before starting. If blocked, report the problem before spending money.

## Instructions
AGENTS.md is the shared instruction source. Different tools discover different file names. Load it explicitly or create a small provider-specific instruction file that refers to it. Do not assume a connector alone makes an agent follow these rules. The fixed CI workflow has read-only repository token permissions and does not call any paid AI API.

## What to deliver
Three linked feature/change pull requests, added tests, browser evidence, a final GitHub Actions run, a tagged v1.0.0 training release and docs/WORK_LOG.md. See the student assignment for human roles and review expectations. No public hosting is required.
