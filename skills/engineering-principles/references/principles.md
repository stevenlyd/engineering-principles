# Steven's engineering principles

This is the canonical principles text. It describes personal engineering preferences for explicitly adopted projects and tasks, not mandates for collaborators' unrelated work. Framework/provider selections are defaults subject to concrete project constraints. Correct state ownership, honest durability, security boundaries, preservation of user data, and truthful evidence are correctness requirements. Strong type derivation is an intentional engineering requirement within adopted scope; do not weaken it into generic advice to avoid complexity.

## 1. One authority for each fact

Use a single source of truth for database and frontend state. Derive state whenever possible. Copies and caches are projections, not additional authorities. Justify denormalization with explicit ownership, update/invalidation, and rebuild rules; handle divergence deliberately.

## 2. Derive TypeScript types

Any type that can be derived must be derived rather than manually redefined, even when that requires complex type gymnastics. Derive from schemas, functions, resources, and existing contracts so changes propagate mechanically. Upfront type infrastructure investment is intentional: reduce long-term complexity and drift. Encapsulate complex derivations behind meaningful names and usable APIs. Do not dilute this preference with a generic “avoid overengineering” escape hatch; document a concrete, explicitly accepted exception when a real constraint prevents derivation.

## 3. Deterministic facts before AI interpretation

Prefer deterministic types, schemas, references, and algorithms for facts that can be verified mechanically. Use AI for irreducible interpretation. Do not substitute semantic guessing for a reliable identifier, relation, validation, or computation.

## 4. Responsive interfaces with honest state

Prefer fine-grained reactivity and optimistic updates with explicit durability, rollback, and retry behavior. Load data, code, and media on demand. Use virtualization and pagination for long lists. Keep cached old data visible while refreshing; show a skeleton only when no data exists. Represent pending and failed work honestly instead of implying a durable save before acceptance.

## 5. Solid and TanStack first

Prefer Solid for frontend development. For projects that warrant SSR, prefer TanStack Start with Solid, subject to verified compatibility for the project's actual versions. Prefer TanStack frontend libraries; choose others for unmet requirements. TanStack Query owns server-state caching and invalidation. Mutations should naturally update or invalidate typed resources. Avoid a second manual refresh or mirrored server-state system.

## 6. Prefer typed RPC operation boundaries

Prefer RPC over direct REST for frontend/backend communication, with type-safe business-operation boundaries. Reduce serial requests and redundant authentication work through appropriate operation design. Do not build mega endpoints or skip authorization, tenant isolation, or necessary security rechecks. No single RPC library is mandated; external protocol constraints may justify other transports.

## 7. Neutral backend framework, clear contracts

Elysia and Hono are both acceptable; no backend framework is mandatory. Use clear module contracts and decoupling. Put SDK and transport details in adapters. Share abstractions for real commonality, with explicit ownership and boundaries, rather than spreading provider details or forcing unrelated cases into one abstraction.

## 8. Effect across frontend and backend

Use Effect.ts whenever feasible on both frontend and backend. It is not a backend-only preference. Compose Effect with Solid UI reactivity and TanStack Query cache ownership instead of duplicating their state. Coordinate retry policies, cancellation, and resource lifecycles across these layers. Verify the actual project's Effect version and APIs rather than assuming one.

## 9. Move suitable work off the critical path

Use queues and containers where appropriate for costly or noncritical asynchronous work. Persist core state or obtain durable acceptance before reporting success. Move notification and media work off the request critical path with suitable idempotency, retry, and failure visibility. Durable acceptance means accepted for processing, not completed. Not every operation needs a container, queue, or asynchronous save.

## 10. Cloudflare first

Prefer the Cloudflare ecosystem. Use another provider when it supplies a capability Cloudflare cannot meet for the project; state that unmet requirement. Neon PostgreSQL is one such option where relational needs require it. Evaluate actual capability and project constraints rather than choosing a provider by habit.

## 11. SQLite-backed Durable Objects first

Prefer SQLite-backed Cloudflare Durable Objects for persistence. Colocate authoritative state, coordinating logic, and database within natural business ownership boundaries. Avoid one global giant Durable Object. If frequent cross-object SQL joins or queries make fragmentation unsuitable, consider Neon PostgreSQL. A legacy migration in one project is not an argument against SQLite generally. Choose boundaries and storage from the workload and consistency requirements.

## 12. Optimize lifetime complexity and feedback

Optimize lifecycle complexity, code quality, reuse, decoupling, and performance together. Measure feedback latency and actual bottlenecks. Prefer explicit stacks over naked recursion for graph and tree algorithms to make depth and control explicit; do not claim they are universally faster without evidence. Invest in reusable infrastructure when it reduces lifetime complexity, including the type infrastructure in principle 2.

## 13. Complete migrations

Finish migrations and remove obsolete compatibility paths. When data can migrate, do not sacrifice the completeness of the new system merely to preserve an old representation. An early-stage hard cutover can be reasonable with explicit scope and a suitable migration/recovery plan. This never implies permission to delete user data or impose blanket downtime on mature production systems. Existing architectures are not automatically migrated by installing this skill.

## 14. Version product contracts and verify deployments

Versioned product definitions describe the commit-local contract, including accepted features that are not implemented yet; distinguish acceptance from implementation status. Keep the global TODO backlog outside branch-local product definitions. Verify runtime deployments against actual manifests and deployed evidence rather than assuming a branch describes the running system. These conventions do not require Suo or Duet.

## 15. Verify meaningful behavior

Use effective tests and evidence proportional to the change and its risk. Keep CI scoped and efficient, while covering affected contracts and relevant integration boundaries. Preserve approved behavior when hardening. Report what was actually run, on which revision, and any limits or failures. Never report fake passed verification or equate a generated file with a working deployment or installation.
