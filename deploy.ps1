# CozumAI — Netlify’ye ucretsiz yayin
# Alternatif (CLI yok): https://app.netlify.com/drop adresine klasoru surukleyin
# Ilk kez: tarayicida Netlify girisi istenir (ucretsiz hesap yeterli).
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "Netlify CLI ile yayinlaniyor..." -ForegroundColor Cyan
npx --yes netlify-cli@latest deploy --prod --dir .

Write-Host ""
Write-Host "Tamam. Netlify panelinden:" -ForegroundColor Green
Write-Host "  1. Site ayarlari > Domain management > Add custom domain"
Write-Host "  2. Aldiginiz domaini ekleyin (ornek: cozumai.com)"
Write-Host "  3. Netlify'nin verdigi DNS kayitlarini domain saticinizda girin"
Write-Host "  4. js/config.js icinde siteUrl = canli https adresiniz" -ForegroundColor Yellow
