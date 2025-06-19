#!/bin/bash

echo "Setting up Full-Stack To-Do List Application"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm."
    exit 1
fi

echo "Node.js and npm are installed"

# Backend setup
echo ""
echo "Setting up Backend (NestJS)..."
cd backend

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "Backend dependencies installed successfully"
else
    echo "Failed to install backend dependencies"
    exit 1
fi

cd ..

# Frontend setup
echo ""
echo "📦 Setting up Frontend (Angular)..."
cd frontend

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "Frontend dependencies installed successfully"
else
    echo "Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Start the backend server:"
echo "   cd backend && npm run start:dev"
echo ""
echo "2. Start the frontend server (in a new terminal):"
echo "   cd frontend && npm start"
echo ""
echo "3. Open your browser and navigate to:"
echo "   http://localhost:4200"
echo ""
echo "Backend API will be available at:"
echo "   http://localhost:3000"
echo ""
echo "For more information, check the README.md file" 