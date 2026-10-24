# Engineering principles

Steven's canonical personal engineering preferences, packaged as a small, installable agent skill. This public repository owns the principles; adopting projects own their constraints and exceptions. Installing the skill does not adopt it for every project, migrate an architecture, or grant new permissions.

- [Skill entrypoint](skills/engineering-principles/SKILL.md)
- [Canonical principles](skills/engineering-principles/references/principles.md)
- [Project adoption, exceptions, and versions](docs/adoption.md)
- [Changelog](CHANGELOG.md)

## Package

The complete portable skill is `skills/engineering-principles/`. Its `SKILL.md` uses standard name/description frontmatter and loads its bundled reference. There are no dependencies, executables, background services, custom updaters, or generated copies of the principles. Repository documentation remains outside the installed payload. Native plugin/extension manifests all discover that same folder. The repository includes a directly installable marketplace; it is not listed in a vendor public directory and is not published to npm. See [native installation and updates](docs/distribution.md).

## Native installation and updates

Use the [host-specific native channels](docs/distribution.md), which cover Codex, Claude Code, Cursor, Copilot CLI/VS Code, Gemini CLI, Hermes, Pi, and the Shelley limitation. Review the source before installation. No new credentials or permissions are bundled.

Native updates may refresh the available plugin while a project stays pinned to its reviewed policy. Follow [project adoption](docs/adoption.md): verify the content identity, load the pinned source on mismatch, and update the project declaration only through a reviewed change. Never treat an installed-latest version as permission to change a project's policy. A failed refresh means freshness is unknown.

## Scope and distribution

Duet or another generic workflow may load an adopted skill, but this repository does not change or depend on those workflows. Publishing this repository does not grant access to any other repository or impose these preferences on other projects.

The source is publicly readable and available through Git-based native installation. No open-source license is declared; public visibility is not a blanket redistribution license. A broader licensing grant remains a separate decision.
