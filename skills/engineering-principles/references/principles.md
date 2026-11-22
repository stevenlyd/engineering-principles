# Steven's engineering principles

This is the canonical principles text. It describes personal engineering preferences for explicitly adopted projects and tasks, not mandates for collaborators' unrelated work. Framework/provider selections are defaults subject to concrete project constraints. Correct state ownership, honest durability, security boundaries, preservation of user data, and truthful evidence are correctness requirements. Strong type derivation is an intentional engineering requirement within adopted scope; do not weaken it into generic advice to avoid complexity.

Principles keep their numbers across releases. They fall into four groups: deciding what to build (16–18); design and correctness (1–4, 6, 9, 12, 19, 20); operating (13–15, 21); and stack defaults (5, 7, 8, 10, 11). Stack defaults are preferences: when one does not fit a stated requirement, apply principle 16 rather than writing custom code.

## 1. One authority for each fact

Use a single source of truth for database and frontend state. Derive state whenever possible. Copies and caches are projections, not additional authorities. Justify denormalization with explicit ownership, update/invalidation, and rebuild rules; handle divergence deliberately.

## 2. Derive TypeScript types and names

Any type that can be derived must be derived rather than manually redefined, even when that requires complex type gymnastics. Derive from schemas, functions, resources, and existing contracts so changes propagate mechanically. Upfront type infrastructure investment is intentional: reduce long-term complexity and drift. Encapsulate complex derivations behind meaningful names and usable APIs. Do not dilute this preference with a generic “avoid overengineering” escape hatch; document a concrete, explicitly accepted exception when a real constraint prevents derivation.

Names and identifiers follow the same rule. When a name already exists in an authoritative source (a function or method, a schema key, a catalog entry), derive it from that source instead of restating it elsewhere. Only when nothing can be derived and a new set of literals must be defined, define it once as an `as const` object, whose entries can also carry per-entry data such as schemas or metadata, and derive the key and value types from it (`keyof typeof`). Do not use TypeScript `enum`, and do not maintain a parallel hand-written string union. Derive at the source and type level, not through runtime reflection such as `Function.name`, which bundling and minification do not preserve.

## 3. Deterministic facts before AI interpretation

Prefer deterministic types, schemas, references, and algorithms for facts that can be verified mechanically. Use AI for irreducible interpretation. Do not substitute semantic guessing for a reliable identifier, relation, validation, or computation.

## 4. Responsive interfaces with honest state

Prefer fine-grained reactivity where the framework chosen under principle 5 provides it; in React, keep subscriptions and state narrow so updates do not re-render broad trees. Prefer optimistic updates with explicit durability, rollback, and retry behavior. Load data, code, and media on demand. Use virtualization and pagination for long lists. Keep cached old data visible while refreshing; show a skeleton only when no data exists. Represent pending and failed work honestly instead of implying a durable save before acceptance.

## 5. Frontend framework follows the target platforms; TanStack first

Choose the UI framework from the platforms the product ships on. When a native app is built alongside the web, use React Native for native and React for the web, so both clients share one data layer (RPC client, query and mutation hooks, cache ownership, live sync and domain logic) and only the views differ. Do not pair a Solid web client with a React Native app: nothing above the framework-free layer can be shared, and every client feature is built twice. For web-only products, prefer Solid. For projects that warrant SSR, prefer TanStack Start with the chosen framework, subject to verified compatibility for the project's actual versions. Prefer TanStack frontend libraries; choose others for unmet requirements. TanStack Query owns server-state caching and invalidation. Mutations should naturally update or invalidate typed resources. Avoid a second manual refresh or mirrored server-state system.

## 6. Prefer typed RPC operation boundaries

Prefer RPC over direct REST for frontend/backend communication, with type-safe business-operation boundaries. Reduce serial requests and redundant authentication work through appropriate operation design. Do not build mega endpoints or skip authorization, tenant isolation, or necessary security rechecks. No single RPC library is mandated; external protocol constraints may justify other transports.

## 7. Neutral backend framework, clear contracts

Elysia and Hono are both acceptable; no backend framework is mandatory. Use clear module contracts and decoupling. Put SDK and transport details in adapters. Share abstractions for real commonality, with explicit ownership and boundaries, rather than spreading provider details or forcing unrelated cases into one abstraction.

## 8. Effect across frontend and backend

Use Effect.ts whenever feasible on both frontend and backend. It is not a backend-only preference. Compose Effect with the UI framework's reactivity and TanStack Query cache ownership instead of duplicating their state. Coordinate retry policies, cancellation, and resource lifecycles across these layers. Verify the actual project's Effect version and APIs rather than assuming one.

## 9. Move suitable work off the critical path

Use queues and containers where appropriate for costly or noncritical asynchronous work. Persist core state or obtain durable acceptance before reporting success. Move notification and media work off the request critical path with suitable idempotency, retry, and failure visibility. Durable acceptance means accepted for processing, not completed. Not every operation needs a container, queue, or asynchronous save.

## 10. Cloudflare first

Prefer the Cloudflare ecosystem. Use another provider when it supplies a capability Cloudflare cannot meet for the project; state that unmet requirement. Neon PostgreSQL is one such option where relational needs require it. Evaluate actual capability and project constraints rather than choosing a provider by habit. When a Cloudflare product does not meet a stated requirement, continue down principle 16's order (a standard, a maintained library, another service) before writing custom code.

## 11. SQLite-backed Durable Objects first

Prefer SQLite-backed Cloudflare Durable Objects for persistence. Colocate authoritative state, coordinating logic, and database within natural business ownership boundaries. Avoid one global giant Durable Object. If frequent cross-object SQL joins or queries make fragmentation unsuitable, consider Neon PostgreSQL. A legacy migration in one project is not an argument against SQLite generally. Choose boundaries and storage from the workload and consistency requirements.

## 12. Optimize lifetime complexity and feedback

Choose the option with the lowest lifetime cost, and say which alternatives were compared. Lifetime cost includes maintenance, coupling, operations and the time to get feedback, not only the first implementation. Measure feedback latency and actual bottlenecks. Prefer explicit stacks over naked recursion for graph and tree algorithms to make depth and control explicit; do not claim they are universally faster without evidence. Invest in reusable infrastructure when it reduces lifetime complexity, including the type infrastructure in principle 2.

## 13. Complete migrations

Finish migrations and remove obsolete compatibility paths. When data can migrate, do not sacrifice the completeness of the new system merely to preserve an old representation. An early-stage hard cutover can be reasonable with explicit scope and a suitable migration/recovery plan. This never implies permission to delete user data or impose blanket downtime on mature production systems. Existing architectures are not automatically migrated by installing this skill. Once real users exist, default to expand-and-contract changes with no downtime; a stop-the-world cutover needs an announced window (principle 21).

## 14. Version product contracts and verify deployments

Versioned product definitions describe the commit-local contract, including accepted features that are not implemented yet; distinguish acceptance from implementation status. Keep the global TODO backlog outside branch-local product definitions. Verify runtime deployments against actual manifests and deployed evidence rather than assuming a branch describes the running system. These conventions do not require Suo or Duet.

## 15. Verify meaningful behavior

Use effective tests and evidence proportional to the change and its risk. Keep CI scoped and efficient, while covering affected contracts and relevant integration boundaries. Preserve approved behavior when hardening. Report what was actually run, on which revision, and any limits or failures. Never report fake passed verification or equate a generated file with a working deployment or installation. A test must fail when the behaviour it covers is removed; check this for new tests on risky paths. Treat a flaky test as a defect: find the cause instead of rerunning it or raising a timeout. Changes to authentication or authorization, destructive migrations, and anything that can lose data or delivery silently get a review independent of the author.

## 16. Standards and established libraries before custom code

Before designing any capability, look for what already solves it, in this order, and record the result in the design or pull request:

1. An open standard or interface (for example OpenFeature for flags, OpenTelemetry for telemetry, WebAuthn for authentication, OAuth and OIDC for delegated access). Code against the standard so the implementation can change.
2. A maintained library or engine that implements it, from any vendor or open source, not only the preferred platform.
3. A managed service; Cloudflare first, per principle 10, when it meets the requirements.
4. Custom code, only for what is specific to the product: integration, policy, data ownership and the product rules around it.

A platform product that falls short is not a reason to write the whole thing: step down this list instead. Write a custom engine (a rule evaluator, a bucketing hash, a parser, cryptography, a sync or retry protocol) only when steps 1 to 3 cannot meet a stated requirement, and name that requirement. A brief that delegates work must ask for this survey explicitly and must never offer "the platform product or build it ourselves" as the only two options.

## 17. Complexity answers a stated requirement

Every mechanism in a design (a table, a state, a tier, a protocol, a trust rule) must answer a requirement someone has stated. Name that requirement in the design, and remove the mechanism when the requirement goes. Prefer the simplest design that meets the stated requirements, and compare it with at least one simpler alternative before building. When a feature is only safe with an elaborate trust or moderation model, first ask whether the feature is worth having. This does not weaken principle 2: type derivation and the reusable infrastructure in principle 12 are stated requirements of adopted scope.

## 18. Prove the riskiest assumption first

Before building a feature in full, write down the assumption that would make the work worthless if it were wrong: a visual effect looks right, a library runs on the target runtime, native code compiles, a platform API behaves as documented, other users can be trusted with a write. Test that assumption with the cheapest experiment that can fail (a prototype on the real device, a spike on the real runtime, a query against real data) and build the rest only after it holds. Report the experiment and its result as evidence under principle 15.

## 19. Authority follows ownership; inputs are untrusted

Permission to change something comes from owning that resource (the item, the account, the tenant), never from sharing an attribute with it such as identical content, a copy or a link. Check authority at the write, in the same transaction as the change. Treat every client, device report and third-party page as untrusted: validate on the server what a client claims, and limit what a claim can affect to the claimant's own data unless the server observed the fact itself. A design that lets anyone other than the owner write shared state needs a written abuse analysis before it is built. Keep credentials and sessions out of reach of embedded or third-party content.

## 20. Know the cost; compute once, close to the user

Before adopting a metered service, find its price per call and what drives the number of calls; prefer designs whose cost does not grow with views. When quality is equal, compute on the user's device or at the edge at no marginal cost rather than on a paid service. Compute a derived artefact once, store the result and serve it; do not recompute it per view or per viewer. Cap what remains metered, and alert before the cap.

## 21. Operable from the first user

Before real users arrive, a system has logs and error reports that reach a person, alerts on the failures that matter, a rollback path that has been rehearsed, backups whose restore has been tested, and a kill switch for each risky feature. Use the platform's tools and open standards for these (principle 16) rather than building dashboards. After launch, releases default to no downtime: additive schema changes first, code that tolerates both shapes, removal later. Old clients keep working or are told to update.
