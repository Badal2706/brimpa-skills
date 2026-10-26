<#
.SYNOPSIS
  Fetch the latest commit of every upstream submodule and report what changed in their skill folders
  since the pinned commit, so the changes can be reviewed and folded into our skills.

.EXAMPLE
  .\scripts\update-upstream.ps1            # report only
  .\scripts\update-upstream.ps1 -Apply     # move the pins to the latest commits (then commit the result)
#>
param([switch]$Apply)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

# ensure submodules are present (shallow)
git submodule update --init --depth 1 2>$null | Out-Null

$skillDirs = @("skills", ".claude/skills", ".agents/skills", ".agent/skills", "agent-skill", "docs")
$lines = git config -f .gitmodules --get-regexp 'submodule\..*\.path' | ForEach-Object { ($_ -split ' ')[1] }

foreach ($path in $lines) {
  if (-not (Test-Path (Join-Path $path ".git"))) { Write-Host "skip $path (not initialised)"; continue }
  Push-Location $path
  $pinned = git rev-parse --short HEAD
  git fetch -q --depth 50 origin 2>$null
  $branch = (git symbolic-ref -q --short refs/remotes/origin/HEAD) -replace '^origin/', ''
  if (-not $branch) { $branch = "main" }
  $latest = git rev-parse --short "origin/$branch"
  if ($pinned -eq $latest) {
    Write-Host ("{0,-32} up to date ({1})" -f $path, $pinned)
  } else {
    $existing = $skillDirs | Where-Object { Test-Path $_ }
    $changed = if ($existing) { git diff --stat "$pinned..$latest" -- $existing | Select-Object -Last 1 } else { git diff --stat "$pinned..$latest" | Select-Object -Last 1 }
    Write-Host ("{0,-32} {1} -> {2}  skills changed: {3}" -f $path, $pinned, $latest, ($changed -replace '\s+', ' ').Trim())
    git log --oneline "$pinned..$latest" -- $existing 2>$null | Select-Object -First 8 | ForEach-Object { Write-Host "    $_" }
    if ($Apply) { git checkout -q $latest }
  }
  Pop-Location
}

if ($Apply) {
  Write-Host "`nPins moved. Review the diffs above, fold changes into skills/, update UPSTREAM.md, then: git add upstream .gitmodules && git commit"
} else {
  Write-Host "`nReport only. Re-run with -Apply to move the pins."
}
