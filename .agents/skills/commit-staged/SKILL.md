---
name: commit-staged
description: Plan logical commit units from staged changes only, suggest commit titles, return the plan only, and create commits only after user approval (e.g. "ok", "please commit"). Use when the user asks to commit changes, plan/split commits, or create logical commits from already staged files.
---

# Commit Planning and Splitting (Staged Changes)

When the user wants to commit **staged** changes, plan logical units from the **staged set only**, suggest titles, and—**only after approval**—create commits in dependency order. Unstaged and untracked files are ignored.

## Plan only until approved

- **On the commit/plan command**: Return **only the plan** (units, titles, files, footer). Do **not** run `git add` or `git commit`. Stop after showing the plan.
- **Commits require approval**: Run `git add` / `git commit` **only** when the user has sent an **approval signal** in a later message.
- **Approval signals**: Treat as approval and then create the commits when the user says things like: "ok", "please commit", "go ahead", "approved", "yes", "do it", "execute", or equivalent.
- **Flow**: First reply = plan + “Reply with ‘ok’ or ‘please commit’ to create these commits.” After the user replies with an approval signal, create the commits and report.

## When to Apply

- User asks to "commit", "plan commits", "split into logical commits", or "change the staged changes and plan the order of commits"
- User provides a message footer (e.g. `refs: EPS-811, #1327`) to append to every commit
- User has **staged** changes and wants to commit only those (or split them into multiple commits)

## Workflow

### Phase A — Plan (run on command; then stop)

### 1. Inspect staged changes and context

- **Only consider staged files.** The user is expected to want to commit only what they've already staged. Ignore unstaged and untracked changes.
- Run `git status` and `git diff --cached --stat` (or `git diff --cached --name-only`) to see **staged** files only.
- List only the modified, added, or deleted files that appear in the staged set. If nothing is staged, report that and stop.

### 2. Unstage if re-grouping

- If the user asked to "change the current staged changes" or "plan the order" (re-group the same staged set into multiple commits), run `git reset HEAD` so you can later stage per unit. The plan still uses **only the files that were staged** before the reset.

### 3. Plan units and order

Group **only the staged files** into **commit units** in **dependency order** (things that other units depend on come first). Do not include unstaged or untracked files in the plan.

Always separate package installation changes and media uploads from code changes:

- **Package install commits**: Group dependency manifest and lockfile changes together (for example, `package.json`, `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`, `Gemfile`, `Gemfile.lock`, `requirements*.txt`, `poetry.lock`). Do not include source code changes in this commit.
- **Media upload commits**: Group added or updated binary/media assets together (for example, images, videos, audio, fonts, PDFs). Do not include source code changes in this commit.
- If source code uses new packages or media assets, order the package/media commits before the code commit that consumes them.

| Priority | Unit type | Typical files |
|----------|-----------|---------------|
| 1 | Package installs | Dependency manifests and lockfiles only |
| 2 | Media uploads | Binary/media assets only |
| 3 | Shared / foundations | Shared utilities, base classes, constants |
| 4 | Routes / config | API endpoints, routing configuration |
| 5 | Feature A | Controllers/Services, UI components, tests |
| 6 | Feature B | Business logic, UI components, tests (reuse shared from earlier unit) |
| 7 | Docs / tooling | Documentation, README, etc. |

## Memory

Refer to [MEMORY.md](MEMORY.md) for user preferences and project context.

- One logical unit = one commit
- Order so that no commit depends on a later commit
- Package installation changes are their own commit without code changes
- Media upload changes are their own commit without code changes
- **UI and its dependencies**: Always commit UI components along with their specific styling and translation files in the same unit.

### 4. Suggest commit title per unit

- **Title**: Follow the [Conventional Commits 1.0.0.md](Conventional%20Commits%201.0.0.md) specification (e.g. `feat: add validation helper`, `fix: user login error`).
- **Body** (optional): Bullet points for non-trivial units
- **Footer**: If the user gave one (e.g. `refs: EPS-811, #1327`), use the same footer on every commit

### 5. Show the plan, then stop

Output:

- Numbered list of units with **suggested title** and **files**
- Footer line if provided
- **Stop.** Do not run Phase B. Add: “Reply with ‘ok’ or ‘please commit’ to create these commits.”

**Do not run `git add` or `git commit` in Phase A.**

---

### Phase B — Execute (run only after user sends an approval signal)

When the user replies with an approval signal (“ok”, “please commit”, “go ahead”, “approved”, “yes”, “do it”, “execute”, or equivalent), then:

### 6. Create commits in order

For each unit, in order (each unit contains only files from the originally staged set):

1. `git add <files>` for that unit only (only files that were staged and assigned to this unit)
2. Build message:
   - First line: suggested title
   - Blank line
   - Optional body (bullets)
   - Blank line (if body present)
   - Footer line if user provided it
3. `git commit -m "<title>" [-m "<body>" -m "<footer>"]`  
   Use multiple `-m` for body and footer so they become separate paragraphs.

### 7. Report

- Print `git log --oneline -<N>` for the new commits
- Confirm working tree is clean or list what’s left uncommitted

## Commit message format

Follow the [Conventional Commits 1.0.0.md](Conventional%20Commits%201.0.0.md) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- **Type**: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, etc.
- **Title**: One line, imperative, ~50 chars or less.
- **Body**: Optional; use for "why" or short bullet list.
- **Footer**: If the user provides a footer (e.g., `refs: EPS-811, #1327`), append it to every commit.

## Guidelines

- **Conventional Commits**: Always follow the specification in [Conventional Commits 1.0.0.md](Conventional%20Commits%201.0.0.md).
- **Staged only**: Plan and commit **only** from the set of files that are currently staged. Ignore unstaged and untracked changes.
- **Plan first, commit after approval**: On the command, output only the plan and ask for approval.
- **One commit per unit**: Each unit is one logical change
- **Dependency order**: Foundations and shared code before features that use them
- **UI and its dependencies**: Always group UI components with their specific styling and translation files.
- **Same footer everywhere**: If the user specifies a footer, add it to every new commit in this run
- **Skip unrelated paths**: Do not commit untracked tooling unless the user asks
- **Repo root**: Run `git` from the repository root
