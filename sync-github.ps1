# GitHub'a ilk yukleme (bir kez)
# 1) gh auth login  (tarayicida GitHub girisi)
# 2) .\sync-github.ps1
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$repoName = "cozumai-website"

Write-Host "GitHub oturumu kontrol ediliyor..." -ForegroundColor Cyan
gh auth status
if ($LASTEXITCODE -ne 0) {
  Write-Host "Once giris yapin: gh auth login" -ForegroundColor Yellow
  gh auth login -h github.com -p https -w
}

$remote = git remote get-url origin 2>$null
if (-not $remote) {
  Write-Host "Repo olusturuluyor: $repoName" -ForegroundColor Cyan
  gh repo create $repoName --public --source=. --remote=origin --push `
    --description "CozumAI — mobil, web, AI ve veri hizmetleri vitrin sitesi"
} else {
  Write-Host "Mevcut remote: $remote" -ForegroundColor Cyan
  git push -u origin main
}

Write-Host ""
Write-Host "Tamam. Repo adresi:" -ForegroundColor Green
gh repo view --web 2>$null
gh repo view --json url -q ".url"
