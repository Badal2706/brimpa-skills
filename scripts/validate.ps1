<#
.SYNOPSIS
  Lightweight structural check of every skill: frontmatter present, name matches folder,
  name charset, description length, SKILL.md under 500 lines, referenced files exist.
  Run `claude plugin validate --strict .` from the repo root as well when Claude Code is installed.
#>
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$fail = 0

foreach ($f in Get-ChildItem (Join-Path $root "skills") -Directory) {
  $md = Join-Path $f.FullName "SKILL.md"
  if (-not (Test-Path $md)) { Write-Host "FAIL $($f.Name): missing SKILL.md"; $fail++; continue }
  $lines = Get-Content $md
  $text = $lines -join "`n"

  if ($lines[0] -ne '---') { Write-Host "FAIL $($f.Name): no frontmatter"; $fail++ }

  $name = ($lines | Where-Object { $_ -match '^name:' } | Select-Object -First 1) -replace '^name:\s*', '' -replace '["'']', ''
  if ($name -ne $f.Name) { Write-Host "FAIL $($f.Name): name '$name' != folder"; $fail++ }
  if ($name -notmatch '^[a-z0-9]+(-[a-z0-9]+)*$' -or $name.Length -gt 64) { Write-Host "FAIL $($f.Name): invalid name charset/length"; $fail++ }

  $descLine = ($lines | Where-Object { $_ -match '^description:' } | Select-Object -First 1)
  if (-not $descLine) { Write-Host "FAIL $($f.Name): no description"; $fail++ }
  else {
    $desc = $descLine -replace '^description:\s*', ''
    if ($desc.Length -gt 1024) { Write-Host "FAIL $($f.Name): description > 1024 chars"; $fail++ }
    elseif ($desc.Length -gt 200) { Write-Host "note $($f.Name): description $($desc.Length) chars (>200; fine for Claude Code, may need shortening for claude.ai upload)" }
  }

  if ($lines.Count -gt 500) { Write-Host "WARN $($f.Name): SKILL.md has $($lines.Count) lines (>500)" }

  # referenced files
  $refs = [regex]::Matches($text, '(?<![\w/])((?:references|scripts|assets)/[A-Za-z0-9._-]+\.[A-Za-z0-9]+)') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
  foreach ($r in $refs) {
    if (-not (Test-Path (Join-Path $f.FullName $r))) { Write-Host "FAIL $($f.Name): missing referenced file $r"; $fail++ }
  }
  Write-Host "ok   $($f.Name) ($($lines.Count) lines, $($refs.Count) refs)"
}

if ($fail -gt 0) { Write-Host "`n$fail problem(s)"; exit 1 } else { Write-Host "`nall skills pass structural checks" }
