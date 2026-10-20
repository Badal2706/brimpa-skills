# Sources

This skill adapts a published method for code-rendered launch films and combines it with motion
guidance from open-source design skills. Nothing is reproduced wholesale; branding, promotional
material and the worked example's product-specific copy and voiceover lines were left out.

| Source | License | What was taken |
|---|---|---|
| "The 60-Second Launch Film Made with Claude" (Saksham Gupta, free PDF guide, Oct 2026) - personal copy | Personal copy; summarized and adapted, not reproduced | The method: single-HTML `render(t)` renderer, Playwright frame capture, ffmpeg encode; 1920x1080 / 30 fps / 1,800 frames; act structure and timings for 60 s (0-12 / 12-19 / 19-49 / 49-60) and 40 s (0-8 / 8-13 / 13-32 / 32-40); reference list (10-20 screenshots, logo, tokens, pain line, 3-5 features, audience, one CTA); "reference only, never show screenshots" rule; 26 px text rule; 2x push-in, 0.1 s cursor lag, hover ring 0.24 s / 0.22 s, +/-3 px hand-held, 6% grain; easing assignment (outExpo / inOutCubic / outBack); Web Audio SFX list and 120 bpm bed; mix settings (voice HPF 80 Hz, comp -20 dB 3:1; bed 0.8, duck 0.025 / 5 / 25 ms / 380 ms; loudnorm -14 LUFS / -1.5 dBTP / LRA 11); vertical safe zones (top 250 px, bottom 350 px); review stills at 1.5 / 12 / 25 / 38 / 50 / 58 s; the step-prompt sequence, beat-sheet-first rule, v1/v2 rule, the ten beginner-vs-pro rules, the pre-post checklist, the "you see / you say" table, the voiceover tag conventions and script shape. Prompts were rewritten product-agnostic. |
| onetake (github.com/feitangyuan/onetake) | PolyForm Noncommercial 1.0.0 | Credited by the guide above as informing its method (render(t), move library, synthesized sound, slideshow-pacing check). No code from it is used or included here; it is not a dependency of this skill. Read its licence before installing it for paid client work. |
| pbakaus/impeccable (`animate.md`, craft floor) | Apache-2.0 | Duration ladder (100-150 ms feedback, 150-300 ms state change, 300-500 ms layout/overlay, 500-800 ms focal entrance), exit-faster-than-entrance, `cubic-bezier(0.16, 1, 0.3, 1)` as the natural deceleration, "no bounce/elastic by reflex", one authored focal moment over scattered effects. |
| anthropics/skills (frontend-design) | Apache-2.0 | One orchestrated motion moment rather than scattered reveals; ground visual choices in the product's own subject matter. |
| ffmpeg documentation (ffmpeg.org/ffmpeg-filters.html) | Public documentation | Filter names and parameter semantics: `silencedetect`, `adelay`, `amix`, `highpass`, `acompressor`, `sidechaincompress`, `loudnorm` (two-pass usage), `tile`, `select`. |
| Playwright for Python documentation (playwright.dev/python) | Apache-2.0 (software), public docs | `sync_playwright`, viewport / `device_scale_factor`, element screenshots, `wait_for_function`. |
| Web Audio API (W3C / MDN) | Public specification and docs | `OfflineAudioContext`, `ConvolverNode`, `DynamicsCompressorNode`, oscillator and gain scheduling. |
| easings.net | Public reference (GPL-3.0 site source; formulas are standard) | Closed-form easing functions for outExpo, inOutCubic, outBack. |
| ElevenLabs documentation | Public docs | Bracketed delivery tags and pause conventions on expressive models (as of Oct 2026). |
| Kokoro TTS (hexgrad/Kokoro-82M) | Apache-2.0 model weights | Named as the open-source, local TTS option. |

SFX synthesis parameters in `motion-and-sound.md` section 8-9 are starting points written for this
skill, not measurements from any source; tune by ear.
