# Project adoption and version policy

Adoption is explicit and project-scoped. Installation only makes the skill available. Use the existing project's instruction convention (normally `AGENTS.md`) to identify the reviewed version and accessible skill location. Preserve unrelated instructions. Do not copy the full principles into project instructions; record only the adoption pin, project constraints, and exceptions.

## Suggested AGENTS.md declaration

Replace `FULL_COMMIT_SHA` with the verified 40-character commit for the chosen release, and adjust the skill location to the actual approved installation. Do not leave placeholders in an adopted project.

```markdown
## Engineering preferences

This project adopts stevenlyd/engineering-principles v0.2.0 at FULL_COMMIT_SHA.
Read the engineering-principles skill at .agents/skills/engineering-principles/SKILL.md
and its bundled canonical reference for engineering decisions in this project.
Verify that the installed payload matches the adopted source revision.

Project constraints: [only concrete constraints relevant to these preferences].
Exceptions: [principle number; affected scope; rationale; approved owner/decision;
review trigger or expiry; migration intent where relevant], or "None".
```

Adoption applies to new work within the authorized task. Existing architecture remains until a migration is separately authorized. The skill's strong type-derivation requirement still applies within adopted scope; do not invent a simplicity exception. A project may explicitly record a real constraint, but should not silently weaken the principle. Current explicit task instructions and project constraints take precedence over personal defaults. If they conflict, surface the tradeoff and resolve it within the task's authorization; do not alter the canonical repository just to hide a local exception.

## Exceptions

An exception records a concrete mismatch, not a permanent blanket waiver. For example, an externally mandated REST interface can be a scoped exception to principle 6 while internal business operations remain type-safe. Identify who accepted the exception through the project's normal decision process; this document does not add an approval bureaucracy. Review when the stated constraint changes. Never interpret a preference exception as permission for data loss, false verification, or bypassing security checks.

## Releases

`package.json` is the version authority; `CHANGELOG.md` records the human-readable changes. Use semantic versions for this instruction contract: a major version changes established requirements incompatibly, a minor version adds meaningful compatible guidance, and a patch clarifies or corrects without intentionally changing decisions. Pre-1.0 releases remain explicit opt-ins; review every update instead of assuming compatibility.

Release tags use `vMAJOR.MINOR.PATCH` and must never be moved. Record the exact Git SHA in adopting projects. Installation and adoption revisions must agree; if the source is unavailable or mismatched, report that limit and do not claim the skill was verified or silently substitute current main. Complete active work under its recorded revision unless the user explicitly chooses an update. Keep global backlog items outside branch-local product contracts; this repository does not add a project-management dependency.

## Maintainer checks

Before a release, run the available skill-creator `quick_validate.py` against `skills/engineering-principles`, check relative Markdown links and standalone payload completeness, review all principles and scope limits, and check for secrets and personal contact details. Commit the complete package and changelog, then create a new immutable tag. Verify remote visibility and branch/tag SHAs. If CI is added later, require terminal results for the exact release commit; do not represent unrun checks as passed.

A new release does not upgrade installed copies, amend project adoption, or prove a host loaded it. Report source publication, installation, and runtime validation as separate facts.

## Machine-readable adoption (optional, used by Duet)

Put `.agents/principles.json` in the adopting project, with `schemaVersion: 1`, `repository` (HTTPS Git repository URL), `revision` (full commit SHA), `version` (release label), `skillPath` (`skills/engineering-principles`), and `skillDigest` (SHA-256 content identity). `AGENTS.md` points to this record and holds only local constraints/exceptions. Do not vendor the full principles.

The digest follows Duet's existing directory identity convention: recursively list regular skill files as `[relative/path, sha256(file_bytes)]` pairs, sort by path using code-point order, serialize compact JSON, then SHA-256 that JSON. Reject symlinks. The adopting change must obtain this identity from the declared source revision, not from an arbitrary installed copy. The revision identifies policy provenance; matching content permits use of a native package with identical bytes, even if its delivery metadata differs.

Use Duet's read-only `principles check --skill /actual/skill/directory` when available. It neither downloads nor executes the policy. A content mismatch is a blocker for applying that installed copy, not an automatic project upgrade. Fetch the declared source into a separate temporary checkout, verify its commit equals `revision`, and read the skill at `skillPath` plus its bundled references. Run the same check against it. If that source is unavailable, disclose the missing policy and continue only independent work. Do not edit managed plugin caches. Hosts without Duet follow the same verification with ordinary Git and file hashing; Duet is optional.

Native auto-update is delivery policy, while this record is project policy. Updating one never updates the other. Finish an active task under its verified policy, activate host updates at a session boundary, and change adoption only in a reviewed commit. Rollback restores the prior adoption record and reads its pinned payload; it need not downgrade other projects' installed plugins.
