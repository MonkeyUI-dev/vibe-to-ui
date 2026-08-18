# MiniMax Static Image Generation

Progressive-load this guide only when the user explicitly asks to use MiniMax for static visual assets. It supplements [VISUAL-ASSET-GENERATION.md](VISUAL-ASSET-GENERATION.md); it does not replace the StyleContext, Visual Family Spec, placement preview, or manifest validation.

## Selection rule

MiniMax is an explicit production choice, not an automatic fallback. Confirm the user selected it, then record `generation.provider: minimax` and `generation.selection: user_explicit` for every resulting asset.

## Preflight

Before generating, confirm the official CLI is installed and authenticated:

```bash
mmx --version
mmx auth status
```

Never ask the user to add an API key to the project or source control. If authentication is unavailable, report it and provide the compiled prompt and Asset Spec without switching providers.

## Supported request contract

Use the official CLI rather than an invented local API wrapper:

```bash
mmx image generate \
  --prompt "<compiled prompt>" \
  --width <512-2048 multiple of 8> \
  --height <512-2048 multiple of 8> \
  --seed <seed> \
  --out-dir <artifact-directory> \
  --non-interactive --quiet
```

MiniMax documents text-to-image and image-to-image through `image-01` / `image-01-live`, dimensions or aspect ratio, batch generation, and seed. The CLI exposes a character subject reference via `--subject-ref`. The documented request surface does not declare a transparent-background or output-format control: inspect and record the downloaded file's actual format, and do not assume a generic style-reference or alpha capability merely because a prompt requests one.

## Background and compositing

- Prefer `scene` for hero imagery and `card` only when the card is intentional and aligned to the page tokens.
- For `background_mode: transparent`, require a verified alpha-bearing output before Apply.
- If alpha is unavailable, use `removable_flat` only as an intermediate file, perform background removal, inspect edge quality on the real page surface, and export transparent PNG/WebP.
- Never ship green-screen, blue-screen, or removable-flat imagery as a final UI asset. Choose the removable color so it does not collide with the subject or brand accent.

## Manifest record

For each asset, write:

```json
{
  "generation": {
    "provider": "minimax",
    "selection": "user_explicit",
    "model": "image-01",
    "seed": 42,
    "reference_mode": "none",
    "output_format": "jpeg",
    "alpha_verified": false,
    "postprocessing": "none"
  }
}
```

Set `output_format` to the actual downloaded or post-processed file format. Set `alpha_verified` only after inspecting the actual exported file, not from the prompt. For a `removable_flat` workflow, set `postprocessing` to `background_removed` only after the resulting alpha edge passes placement preview.

## Continuity gate

Generate and placement-test the family anchor first. Subsequent MiniMax assets inherit the same StyleContext, Visual Family Spec, style seed, composition rules, and approved anchor observations. If MiniMax cannot use the required reference mode, generate fewer variants and require contact-sheet plus placement review before accepting a sibling.

## Sources

- [MiniMax image generation](https://platform.minimaxi.com/docs/guides/image-generation)
- [MiniMax CLI](https://platform.minimaxi.com/docs/token-plan/minimax-cli)
