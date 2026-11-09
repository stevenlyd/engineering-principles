# Changelog

## 0.3.0 — 2026-11-09

Principle 2 now covers names as well as types: derive names and identifiers from their authoritative source (for example, event types from the methods that emit them); when a new literal set is unavoidable, define it once as an `as const` object and derive its types, never a TypeScript `enum` or a parallel string union, and never through runtime reflection such as `Function.name`. Still 15 principles.

Breaking changes: none intended; projects pinned to 0.2.0 keep their policy until their adoption record is updated in a reviewed change. Migration: replace `enum` declarations and duplicated name lists in adopted new work; existing code is not migrated automatically.

## 0.2.0 — 2026-10-24

Public source with native Codex/Claude/Copilot marketplaces, Agent Plugins metadata, Gemini extension metadata, and Pi discovery. One unchanged canonical set of 15 principles. Project pins remain authoritative when native packages update; mismatch handling uses verified pinned source rather than silently changing policy. No custom updater or background service.

Breaking changes: none to the principles. Migration: replace copied installations with a reviewed native channel; preserve local edits and remove duplicates only after native discovery is verified.

## 0.1.0 — 2026-10-24

Initial private distribution of Steven's 15 engineering principles as the standard `engineering-principles` skill. Includes one canonical principles reference, explicit project adoption and exception guidance, and manual version-pinned installation, update, and rollback instructions. No global installation, project migration, Duet changes, or automatic update service.
