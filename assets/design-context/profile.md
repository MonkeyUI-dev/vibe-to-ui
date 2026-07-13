---
# Profile metadata (machine-readable). Live copy:
# ~/.vibe-to-ui/profiles/<profile>/profile.md
# Seed only — skill updates must never overwrite user profiles.
name: "<profile>"
display_name: ""
description: ""
created_at: "YYYY-MM-DDTHH:MM:SSZ"
updated_at: "YYYY-MM-DDTHH:MM:SSZ"
sources_summary: []
targets_available: []
version: 1
---

# Profile: [Display Name]

> Design Context profile for a brand, product, or client — not an output platform.
> Shared brand language lives in `brand.md` + `tokens.json` + `decisions.md`.

## Summary

- **Id**: `<!-- kebab-case, same as directory name -->`
- **Display name**:
- **One-liner**:
- **Owner / client** (optional):

## Sources

Primary extraction sources (details also under `sources/`):

- <!-- URL or screenshot basename — date -->

## Targets

Medium adaptations under `targets/` (created on demand; not seeded by this skill).
Any kebab-case medium id is valid — examples below are illustrative only:

| Target | Status | Updated |
|--------|--------|---------|
| <!-- e.g. web, social-cover, linkedin, print-brochure --> | not created | — |

When a target is first requested, add a row here and set `targets_available` in the frontmatter.

## Notes

<!-- Free-form profile notes: brand aliases, related projects, handoff tips -->
