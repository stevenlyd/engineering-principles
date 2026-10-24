---
name: engineering-principles
description: Apply Steven's engineering preferences when explicitly requested or adopted by the current project's instructions, for architecture, implementation, review, and migration decisions. Installation alone does not adopt these preferences for unrelated projects.
---

# Engineering principles

Read [the canonical principles](references/principles.md) before making engineering decisions under this skill. Apply the relevant principles to the requested scope; this is guidance for judgment, not a requirement to redesign every touched subsystem.

Check the project's adoption declaration for its pinned version, constraints, and exceptions. If its pin differs from the loaded skill, disclose the mismatch and obtain the declared revision before claiming compliance. Do not silently upgrade the project. When explicitly invoked without project adoption, apply this revision to the current request and state that scope without installing or editing adoption files.

Separate architectural preferences from correctness invariants. Project constraints and explicit task instructions can override preferences; surface material tradeoffs and record authorized exceptions in the project, not in this canonical skill. Preserve the strong requirement to derive any derivable TypeScript type: complexity alone is not a reason to redefine it manually. An exception must be explicit, not an implicit appeal to simplicity.

Use the principles to choose or review the smallest complete change that meets the task. Identify relevant state ownership, type derivation, durability, and verification boundaries. Report material exceptions and actual evidence; do not manufacture passed checks. Installing or invoking this skill does not authorize migrations, deletion, deployment, collaborator access, or changes to other projects.

The repository's project adoption and version instructions are maintainer documentation; the installed skill remains self-contained through the reference above. No dependency on Duet, Suo, a specific Effect version, or a particular RPC library is required.
