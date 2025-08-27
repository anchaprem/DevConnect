@echo off
echo ========================================
echo DevConnect Startup Script
echo ========================================
echo.

echo Starting MongoDB...
net start MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB started successfully
) else (
    echo ⚠️ MongoDB might already be running or not installed
)

echo.
echo Starting DevConnect Server...
cd server
start "DevConnect Server" cmd /k "npm run dev"

echo.
echo Waiting for server to start...
timeout /t 5 /nobreak >nul

echo.
echo Starting DevConnect Frontend...
cd ..\devconnect-app
start "DevConnect Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo 🚀 DevConnect is starting up!
echo ========================================
echo.
echo Server: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Press any key to open the application...
pause >nul

start http://localhost:5173
start http://localhost:3000/health

echo.
echo ✅ DevConnect startup complete!
echo Check the terminal windows for any errors.
echo.
pause
