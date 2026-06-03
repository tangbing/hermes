---
name: create-tts
description: Extract, review, and synthesize step-aligned narration audio for web-video-presentation projects. Use when Codex needs to generate presentation TTS audio from chapter narrations with voice `Chinese (Mandarin)_Gentleman`, by first producing a human-reviewable narration segment list and only after approval synthesizing missing per-step audio files under `presentation/public/audio/<chapter-id>/<step>.mp3`.
---

# Create TTS

Use this skill to turn a completed `web-video-presentation` project into per-step narration audio.

The workflow has two mandatory phases:

1. Extract all narration text into a reviewable segment list.
2. After human approval, synthesize audio incrementally, skipping files that already exist.

Do not synthesize audio before the user confirms the extracted text list.

## Project Assumptions

Run from a repo that contains:

```text
presentation/
├── src/chapters/<NN>-<id>/narrations.ts
├── src/registry/chapters.ts
├── scripts/extract-narrations.ts
├── scripts/synthesize-audio.sh
├── scripts/tts-providers/
└── package.json
```

The source of truth is each chapter's `narrations.ts`. Normal narration steps should map one-to-one with webpage steps. Empty narration strings are silent steps and should be called out during review.

Default voice for Mandarin narration:

```text
Chinese (Mandarin)_Gentleman
```

## Phase 1: Extract And Review

1. Run:

```bash
cd presentation
npm run extract-narrations
```

2. Read `presentation/audio-segments.json`.

3. Produce a compact human-review checklist grouped by chapter:

```text
Chapter <id>
  1. <text>
  2. <text>
```

Include:

- total chapters
- total segments
- any empty narration steps
- any very long segment likely to sound awkward
- any suspicious typo, duplicated sentence, missing sentence, weird punctuation, or odd segmentation
- whether chapter step counts appear consistent with `narrations.ts`

4. Stop and ask the user to confirm the text list.

Use direct language:

```text
我已抽取 audio-segments.json，并人工扫了一遍。请确认这些口播文本和断句是否可以进入合成。你确认后我再执行 TTS。
```

Do not run synthesis until the user clearly approves.

## Phase 2: Synthesize

After approval, synthesize with the configured TTS backend and the voice `Chinese (Mandarin)_Gentleman`. Do not hard-code a vendor in the workflow unless the user explicitly names one.

Preferred command:

```bash
cd presentation
npm run synthesize-audio -- --voice="Chinese (Mandarin)_Gentleman"
```

Equivalent env form:

```bash
cd presentation
PRESENTATION_TTS_VOICE="Chinese (Mandarin)_Gentleman" npm run synthesize-audio
```

The runner:

- reads `audio-segments.json`
- writes `public/audio/<chapter-id>/<step>.mp3`
- uses 1-indexed filenames matching step numbers
- skips existing mp3 files unless `--force` is passed
- can be rerun after interruption without regenerating completed files

Never pass `--force` unless the user explicitly asks to regenerate existing audio.

## Preflight

Before synthesis, check the configured synthesis runner is available:

```bash
cd presentation
ls scripts/tts-providers
bash scripts/synthesize-audio.sh --help
```

If the configured backend is missing, unauthenticated, or rejects the voice, tell the user exactly what failed. Do not pretend audio was created if provider checks fail.

## Completion Report

After synthesis, report:

- provider and voice used
- synthesized count, skipped count, failed count from runner output
- output root: `presentation/public/audio/`
- one example path per chapter pattern: `public/audio/<chapter-id>/<step>.mp3`
- any failures and the command to resume

If useful, verify file layout:

```bash
find public/audio -type f -name '*.mp3' | sort
```

Optional duration audit when `ffprobe` is available:

```bash
for f in public/audio/*/*.mp3; do
  d=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$f")
  echo "$f  ${d}s"
done
```

Flag segments at or above 15 seconds for review.

## Failure Handling

- If extraction fails, inspect `scripts/extract-narrations.ts`, `chapters.ts`, and the reported `narrations.ts`; fix structural issues only after confirming they are not intentional content changes.
- If `jq` is missing, install or ask the user to install it; the synthesis runner requires it.
- If synthesis stops midway, rerun the same synthesis command. Existing files will be skipped.
- If a single segment sounds wrong, ask whether to edit the corresponding `narrations.ts` and regenerate that step with `--force` only after user approval.
