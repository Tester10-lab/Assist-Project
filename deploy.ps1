# Deploy and Verification Script for Assist Roofing
param(
  [string]$CommitMessage = "chore: deploy update"
)

Write-Host "`n🚀 [1/3] Building application and generating production bundle..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Build failed! Aborting deploy." -ForegroundColor Red
  exit $LASTEXITCODE
}

Write-Host "`n🔍 [2/3] Checking code quality and linting..." -ForegroundColor Cyan
npm run lint
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Linting failed! Aborting deploy." -ForegroundColor Red
  exit $LASTEXITCODE
}

Write-Host "`n📊 [3/4] Running master SEO & GEO audit..." -ForegroundColor Cyan
node tools/assist-seo.mjs report

Write-Host "`n🧪 [4/4] Verifying production Express routes and deep linking..." -ForegroundColor Cyan
npm run test:routes
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Route verification failed! Aborting deploy." -ForegroundColor Red
  exit $LASTEXITCODE
}

Write-Host "`n✅ Assist Roofing application successfully validated, built, and ready for deployment!`n" -ForegroundColor Green
