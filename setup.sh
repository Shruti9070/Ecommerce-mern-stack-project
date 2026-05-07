#!/bin/bash

# Privon - Automated Setup Script

echo "🚀 Setting up Privon MERN eCommerce..."
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed ✅"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
MONGO_URI=mongodb+srv://Shrutii:Shruti12@cluster0.zuuahbi.mongodb.net/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
PORT=5000
RAZORPAY_KEY_ID=rzp_test_1DP5MMOk9V27p3
RAZORPAY_KEY_SECRET=rn3PnnIYYiHw6Y5n3VJpMnJ8
EOF
    echo "✅ .env created"
else
    echo "✅ .env already exists"
fi

cd ..

# Frontend Setup
echo ""
echo "⚛️  Setting up Frontend..."
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed ✅"
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "🎯 To start the project:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend && npm start"
echo ""
echo "Happy Coding! 🚀"
