<#
.SYNOPSIS
  Zip every skill (or one skill) into dist/<name>.zip for upload to Claude Desktop / claude.ai.

.DESCRIPTION
  claude.ai expects ONE skill per zip, with the skill folder at the root of the archive:
      my-skill.zip -> my-skill/SKILL.md
  A SKILL.md sitting at the zip root is NOT recognised, so entries are always prefixed with the
  folder name. Entries are written with forward slashes: Windows PowerShell 5.1's Compress-Archive
  writes backslashes, which zip readers on Linux servers can treat as part of the file name.

.EXAMPLE
  .\scripts\package-skills.ps1              # package all skills
  .\scripts\package-skills.ps1 ui-ux        # package one skill
#>
param(
  [string]$Skill = ""
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

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

  $zipPath = Join-Path $dist ($f.Name + ".zip")
  if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

  $zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    Get-ChildItem $f.FullName -Recurse -File |
      Where-Object { $_.Name -notin @('.DS_Store', 'Thumbs.db') -and $_.FullName -notmatch '\\__pycache__\\' } |
      ForEach-Object {
        $rel = $_.FullName.Substring($f.FullName.Length).TrimStart('\', '/') -replace '\\', '/'
        $entry = "$($f.Name)/$rel"
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $entry, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
      }
  } finally {
    $zip.Dispose()
  }
  Write-Host "packaged $zipPath"
}

Write-Host ""
Write-Host "Upload in Claude Desktop / claude.ai: sidebar > Customize > Skills > + Add > Upload a skill."
