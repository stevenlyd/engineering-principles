# Engineering principles

Steven's canonical personal engineering preferences, packaged as a small, installable agent skill. This private repository owns the principles; adopting projects own their constraints and exceptions. Installing the skill does not adopt it for every project, migrate an architecture, or grant new permissions.

- [Skill entrypoint](skills/engineering-principles/SKILL.md)
- [Canonical principles](skills/engineering-principles/references/principles.md)
- [Project adoption, exceptions, and versions](docs/adoption.md)
- [Changelog](CHANGELOG.md)

## Package

The complete portable skill is `skills/engineering-principles/`. Its `SKILL.md` uses standard name/description frontmatter and loads its bundled reference. There are no dependencies, executables, background services, custom updaters, or generated copies of the principles. Repository documentation remains outside the installed payload. This is a skill package, not a published plugin marketplace or npm package.

## Install with Codex

Use Codex's built-in **skill-installer** and ask it to install `skills/engineering-principles` from `stevenlyd/engineering-principles` at the reviewed `v0.1.0` tag or an exact commit SHA. The repository is private: the installing account needs existing authorized GitHub access. Never put credentials in URLs.

For installations that provide the bundled helper at the standard location, the equivalent command is:

```sh
python3 "${CODEX_HOME:-$HOME/.codex}/skills/.system/skill-installer/scripts/install-skill-from-github.py" \
  --repo stevenlyd/engineering-principles \
  --path skills/engineering-principles \
  --ref v0.1.0
```

The helper installs into `$CODEX_HOME/skills` (default `~/.codex/skills`), supports `--dest` for an explicitly selected destination, and refuses an existing skill directory. Private downloads may fall back to Git using existing credentials. If the helper is elsewhere, use the skill-installer available in your host rather than guessing its location. The installed skill is available on the next turn; confirm the intended revision before use.

For a project-scoped copy, use the helper's `--dest /absolute/path/to/project/.agents/skills` only after the project has approved adoption and the host supports that discovery location. Commit the reviewed copy if project policy calls for it; it remains a projection of this repository, not a separate place to edit the principles. Other agents can consume the same standard skill folder through their documented skill installation mechanisms; no cross-host live compatibility is claimed here.

## Updates and rollback

Installation creates a copy, not a subscription. There are **no automatic updates**. Review the changelog and source diff, select a release or exact SHA, then install into a fresh staging directory with `--dest`. Compare the staged payload with the existing copy, preserve any local edits, and deliberately replace only this skill after review. Do not force an overwrite or modify a managed plugin cache. Record the new source SHA and update the project's adoption declaration in the same reviewed change. Activate at a new task/session boundary and verify the loaded revision. Roll back by restoring the recorded prior payload and adoption pin together.

For reproducible work, pin the full commit SHA; release tags are readable labels that maintainers must never move. A checkout of `main` or a locally edited copy is not proof of the adopted release. A failed refresh means freshness is unknown, not that the installed copy is current.

## Scope and distribution

Duet or another generic workflow may load an adopted skill, but this repository does not change or depend on those workflows. No other project, global skill installation, collaborator access, or host update setting is changed by creating this repository.

This private source is intended for Steven and separately authorized recipients. No public license or public redistribution permission is granted here. Publication or broader licensing is a separate decision.
