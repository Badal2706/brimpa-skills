#!/usr/bin/env bash
# Zip every skill (or one skill) into dist/<name>.zip for upload to Claude Desktop / claude.ai.
# claude.ai expects ONE skill per zip with the folder at the archive root: my-skill.zip -> my-skill/SKILL.md
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
skills_dir="$root/skills"
dist="$root/dist"
mkdir -p "$dist"

if [ "${1:-}" != "" ]; then
  targets=("$skills_dir/$1")
else
  targets=("$skills_dir"/*/)
fi

for dir in "${targets[@]}"; do
  dir="${dir%/}"
  name="$(basename "$dir")"
  if [ ! -f "$dir/SKILL.md" ]; then echo "skip $name: no SKILL.md" >&2; continue; fi

  fm_name="$(awk '/^name:/{sub(/^name:[ \t]*/,""); gsub(/["'"'"']/,""); print; exit}' "$dir/SKILL.md")"
  if [ "$fm_name" != "$name" ]; then echo "warn $name: frontmatter name '$fm_name' != folder" >&2; fi

  desc_len="$(awk '/^description:/{d=$0; sub(/^description:[ \t]*/,"",d); print length(d); exit}' "$dir/SKILL.md")"
  if [ "${desc_len:-0}" -gt 200 ]; then
    echo "note $name: description is $desc_len chars; shorten to <=200 if claude.ai rejects the upload."
  fi

  rm -f "$dist/$name.zip"
  (cd "$skills_dir" && zip -qr "$dist/$name.zip" "$name" -x '*.DS_Store' '*/__pycache__/*')
  echo "packaged $dist/$name.zip"
done

echo
echo "Upload in Claude Desktop / claude.ai: sidebar > Customize > Skills > + > Create skill > Upload a skill."
