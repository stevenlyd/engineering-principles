# Changelog

## 0.4.0 — 2026-11-11

Principle 5 now chooses the frontend framework from the target platforms: when a native app ships alongside the web, use React Native for native and React for the web so both clients share one data layer and only views differ; Solid remains the preference for web-only products. Principles 4 and 8 no longer assume Solid: fine-grained reactivity applies where the chosen framework provides it, and Effect composes with whichever UI framework is chosen. Still 15 principles.

Breaking changes: a project with both web and native clients now prefers React over Solid for the web. Projects pinned to 0.3.0 keep their policy until their adoption record is updated in a reviewed change. Migration: existing Solid web clients are not migrated automatically; a project that adopts 0.4.0 and has a native client should plan a separately authorized move of its web client to React.

## 0.3.0 — 2026-11-09

Principle 2 now covers names as well as types: derive names and identifiers from their authoritative source (for example, event types from the methods that emit them); when a new literal set is unavoidable, define it once as an `as const` object and derive its types, never a TypeScript `enum` or a parallel string union, and never through runtime reflection such as `Function.name`. Still 15 principles.

Breaking changes: none intended; projects pinned to 0.2.0 keep their policy until their adoption record is updated in a reviewed change. Migration: replace `enum` declarations and duplicated name lists in adopted new work; existing code is not migrated automatically.

## 0.2.0 — 2026-10-24

Public source with native Codex/Claude/Copilot marketplaces, Agent Plugins metadata, Gemini extension metadata, and Pi discovery. One unchanged canonical set of 15 principles. Project pins remain authoritative when native packages update; mismatch handling uses verified pinned source rather than silently changing policy. No custom updater or background service.

Breaking changes: none to the principles. Migration: replace copied installations with a reviewed native channel; preserve local edits and remove duplicates only after native discovery is verified.

## 0.1.0 — 2026-10-24

Initial private distribution of Steven's 15 engineering principles as the standard `engineering-principles` skill. Includes one canonical principles reference, explicit project adoption and exception guidance, and manual version-pinned installation, update, and rollback instructions. No global installation, project migration, Duet changes, or automatic update service.
