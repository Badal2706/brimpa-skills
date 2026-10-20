<#
.SYNOPSIS
  Zip every skill (or one skill) into dist/<name>.zip for upload to Claude Desktop / claude.ai.

.DESCRIPTION
  claude.ai expects ONE skill per zip, with the skill folder at the root of the archive:
      my-skill.zip -> my-skill/SKILL.md
  A SKILL.md sitting at the zip root is NOT recognised, so this script always zips from the
  parent of the skill folder. It also warns when a description is longer than 200 characters,
  because the claude.ai upload UI has been documented with a 200-character limit even though the
  Agent Skills spec allows 1024.

.EXAMPLE
  .\scripts\package-skills.ps1              # package all skills
  .\scripts\package-skills.ps1 ui-ux        # package one skill
#>
param(
  [string]$Skill = ""
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$skillsDir = Join-Path $root "skills"
$dist = Join-Path $root "dist"
New-Item -ItemType Directory -Force -Path $dist | Out-Null

$folders = if ($Skill) { @(Get-Item (Join-Path $skillsDir $Skill)) } else { Get-ChildItem $skillsDir -Directory }

foreach ($f in $folders) {
  $skillMd = Join-Path $f.FullName "SKILL.md"
  if (-not (Test-Path $skillMd)) { Write-Warning "Skipping $($f.Name): no SKILL.md"; continue }

  $text = Get-Content $skillMd -Raw
  if ($text -match '(?m)^name:\s*(.+)$') {
    $name = $Matches[1].Trim().Trim('"').Trim("'")
    if ($name -ne $f.Name) { Write-Warning "$($f.Name): frontmatter name '$name' does not match folder name" }
  }
  if ($text -match '(?ms)^description:\s*(.+?)(?=^\w[\w-]*:|^---)') {
    $desc = ($Matches[1] -replace '\s+', ' ').Trim().Trim('"').Trim("'")
    if ($desc.Length -gt 200) {
      Write-Host "  note: $($f.Name) description is $($desc.Length) chars; if claude.ai rejects the upload, shorten it to <= 200." -ForegroundColor Yellow
    }
  }

  $zip = Join-Path $dist ($f.Name + ".zip")
  if (Test-Path $zip) { Remove-Item $zip -Force }
  # Compress from the parent so the archive contains <name>/SKILL.md
  Compress-Archive -Path $f.FullName -DestinationPath $zip -CompressionLevel Optimal
  Write-Host "packaged $zip"
}

Write-Host ""
Write-Host "Upload in Claude Desktop / claude.ai: sidebar > Customize > Skills > + > Create skill > Upload a skill."
