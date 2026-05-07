# Privon - Windows Setup Script

Write-Host "🚀 Setting up Privon MERN eCommerce..." -ForegroundColor Cyan
Write-Host ""

# Backend Setup
Write-Host "📦 Setting up Backend..." -ForegroundColor Yellow

Set-Location backend

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
    npm install
} else {
    Write-Host "Backend dependencies already installed ✅" -ForegroundColor Green
}

# Check if .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Cyan
    @"
MONGO_URI=mongodb+srv://Shrutii:Shruti12@cluster0.zuuahbi.mongodb.net/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
PORT=5000
RAZORPAY_KEY_ID=rzp_test_1DP5MMOk9V27p3
RAZORPAY_KEY_SECRET=rn3PnnIYYiHw6Y5n3VJpMnJ8
"@ | Set-Content .env
    Write-Host "✅ .env created" -ForegroundColor Green
} else {
    Write-Host "✅ .env already exists" -ForegroundColor Green
}

Set-Location ..

# Frontend Setup
Write-Host ""
Write-Host "⚛️  Setting up Frontend..." -ForegroundColor Yellow

Set-Location frontend

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    npm install
} else {
    Write-Host "Frontend dependencies already installed ✅" -ForegroundColor Green
}

Set-Location ..

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 To start the project:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1 (Backend):" -ForegroundColor Yellow
Write-Host "  cd backend && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 (Frontend):" -ForegroundColor Yellow
Write-Host "  cd frontend && npm start" -ForegroundColor White
Write-Host ""
Write-Host "Happy Coding! 🚀" -ForegroundColor Green
