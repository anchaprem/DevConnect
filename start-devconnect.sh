#!/bin/bash

echo "========================================"
echo "DevConnect Startup Script"
echo "========================================"
echo

# Check if MongoDB is running
echo "Checking MongoDB status..."
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is already running"
else
    echo "Starting MongoDB..."
    if command -v brew &> /dev/null; then
        brew services start mongodb-community
    elif command -v systemctl &> /dev/null; then
        sudo systemctl start mongod
    else
        echo "⚠️ Please start MongoDB manually"
    fi
fi

echo
echo "Starting DevConnect Server..."
cd server
npm run dev &
SERVER_PID=$!

echo
echo "Waiting for server to start..."
sleep 5

echo
echo "Starting DevConnect Frontend..."
cd ../devconnect-app
npm run dev &
FRONTEND_PID=$!

echo
echo "========================================"
echo "🚀 DevConnect is starting up!"
echo "========================================"
echo
echo "Server: http://localhost:3000"
echo "Frontend: http://localhost:5173"
echo
echo "Press Ctrl+C to stop all services..."

# Function to cleanup on exit
cleanup() {
    echo
    echo "Stopping services..."
    kill $SERVER_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Services stopped"
    exit 0
}

# Set trap for cleanup
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait
