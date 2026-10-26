"""Turn a local video (mp4, mov, mkv, webm) into something Claude can read: keyframes + a timestamped transcript.

Usage:
  python video_digest.py <video> [--out DIR] [--model medium] [--lang auto|hi|en] [--translate] [--scene 0.3] [--max-frames 60]

Output (in DIR, default: <video name>_digest next to the video):
  frames/frame_0001_00m12s.jpg ...   keyframes at scene changes (plus one every --every seconds as a floor)
  transcript.md                      timestamped transcript in the spoken language (Hindi stays Devanagari)
  transcript_en.md                   English translation (only with --translate, or automatically when --lang is not en)
  digest.md                          index: video facts, language detected, frame list with timestamps, transcript path

Then ask Claude to read digest.md, the frames and the transcript, and write a knowledge note or skill update.

Needs: ffmpeg on PATH (or FFMPEG env var), faster-whisper (pip install faster-whisper). Uses the GPU when CUDA is available.
Model guide: small = fast draft; medium = good English and decent Hindi; large-v3 = best Hindi/Hinglish (needs ~3 GB VRAM with int8).
"""
import argparse, json, os, pathlib, re, shutil, subprocess, sys, time

def ffmpeg_bin():
    return os.environ.get("FFMPEG") or shutil.which("ffmpeg") or r"C:\ffmpeg\bin\ffmpeg.exe"

def ffprobe_bin():
    f = ffmpeg_bin()
    p = pathlib.Path(f).with_name("ffprobe" + pathlib.Path(f).suffix)
    return str(p) if p.exists() else (shutil.which("ffprobe") or "ffprobe")

def ts(sec):
    m, s = divmod(int(sec), 60); h, m = divmod(m, 60)
    return f"{h:d}:{m:02d}:{s:02d}" if h else f"{m:02d}:{s:02d}"

def probe(video):
    out = subprocess.run([ffprobe_bin(), "-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height",
                          "-of", "json", str(video)], capture_output=True, text=True)
    info = json.loads(out.stdout or "{}")
    dur = float(info.get("format", {}).get("duration", 0) or 0)
    v = next((s for s in info.get("streams", []) if s.get("codec_type") == "video"), {})
    has_audio = any(s.get("codec_type") == "audio" for s in info.get("streams", []))
    return dur, v.get("width"), v.get("height"), has_audio

def extract_frames(video, out, scene, every, max_frames, duration):
    fdir = out / "frames"; fdir.mkdir(parents=True, exist_ok=True)
    for f in fdir.glob("*.jpg"): f.unlink()
    # scene-change frames plus a floor of one frame every `every` seconds
    vf = f"select='gt(scene,{scene})+isnan(prev_selected_t)+gte(t-prev_selected_t,{every})',scale='min(1280,iw)':-2,showinfo"
    proc = subprocess.run([ffmpeg_bin(), "-hide_banner", "-i", str(video), "-vf", vf, "-vsync", "vfr", "-q:v", "3",
                           str(fdir / "raw_%04d.jpg")], capture_output=True, text=True)
    times = [float(t) for t in re.findall(r"pts_time:([0-9.]+)", proc.stderr)]
    raws = sorted(fdir.glob("raw_*.jpg"))
    pairs = list(zip(raws, times))
    if len(pairs) > max_frames:                       # thin evenly, keep first and last
        step = len(pairs) / max_frames
        keep = {int(i * step) for i in range(max_frames)} | {len(pairs) - 1}
        for i, (p, _) in enumerate(pairs):
            if i not in keep: p.unlink()
        pairs = [pr for i, pr in enumerate(pairs) if i in keep]
    final = []
    for n, (p, t) in enumerate(pairs, 1):
        name = f"frame_{n:04d}_{int(t)//60:02d}m{int(t)%60:02d}s.jpg"
        p.rename(fdir / name); final.append((name, t))
    return final

def transcribe(video, out, model_name, lang, translate):
    from faster_whisper import WhisperModel
    try:
        import ctranslate2; cuda = ctranslate2.get_cuda_device_count() > 0
    except Exception:
        cuda = False
    device, ctype = ("cuda", "int8_float16") if cuda else ("cpu", "int8")
    model = WhisperModel(model_name, device=device, compute_type=ctype)
    language = None if lang == "auto" else lang
    segs, info = model.transcribe(str(video), language=language, task="transcribe", vad_filter=True, beam_size=5)
    lines = [f"- [{ts(s.start)}] {s.text.strip()}" for s in segs]
    detected = info.language
    (out / "transcript.md").write_text(f"# Transcript ({detected}, p={info.language_probability:.2f}, model {model_name}, {device})\n\n" + "\n".join(lines) + "\n", encoding="utf-8")
    en_path = None
    if translate or (detected != "en" and lines):
        segs2, _ = model.transcribe(str(video), language=detected, task="translate", vad_filter=True, beam_size=5)
        en = [f"- [{ts(s.start)}] {s.text.strip()}" for s in segs2]
        en_path = out / "transcript_en.md"
        en_path.write_text(f"# English translation of a {detected} transcript (Whisper translate, model {model_name})\n\n" + "\n".join(en) + "\n", encoding="utf-8")
    return detected, info.language_probability, len(lines), device, en_path

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video"); ap.add_argument("--out"); ap.add_argument("--model", default="medium")
    ap.add_argument("--lang", default="auto"); ap.add_argument("--translate", action="store_true")
    ap.add_argument("--scene", type=float, default=0.3); ap.add_argument("--every", type=float, default=20.0)
    ap.add_argument("--max-frames", type=int, default=60); ap.add_argument("--no-audio", action="store_true")
    a = ap.parse_args()
    video = pathlib.Path(a.video).resolve()
    out = pathlib.Path(a.out).resolve() if a.out else video.with_name(video.stem + "_digest")
    out.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    dur, w, h, has_audio = probe(video)
    frames = extract_frames(video, out, a.scene, a.every, a.max_frames, dur)
    tr = None
    if has_audio and not a.no_audio:
        tr = transcribe(video, out, a.model, a.lang, a.translate)
    md = [f"# Video digest: {video.name}", "",
          f"- Duration: {ts(dur)} | Resolution: {w}x{h} | Audio: {'yes' if has_audio else 'no'}",
          f"- Frames: {len(frames)} (scene threshold {a.scene}, floor every {a.every:.0f}s) in `frames/`"]
    if tr:
        lang, p, nseg, device, en = tr
        md.append(f"- Speech: language `{lang}` (p={p:.2f}), {nseg} segments, model {a.model} on {device} -> `transcript.md`" + (f", English -> `{en.name}`" if en else ""))
    md.append(f"- Processing time: {time.time()-t0:.0f}s"); md.append(""); md.append("## Frames"); md.append("")
    md += [f"- [{ts(t)}] frames/{n}" for n, t in frames]
    (out / "digest.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    print("\n".join(md[:5])); print(f"-> {out / 'digest.md'}")

if __name__ == "__main__":
    main()
