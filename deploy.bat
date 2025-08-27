@echo off
echo 🚀 DevConnect Deployment Script
echo ================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the root DevConnect directory
    pause
    exit /b 1
)

if not exist "devconnect-app" (
    echo ❌ Error: devconnect-app directory not found
    pause
    exit /b 1
)

if not exist "server" (
    echo ❌ Error: server directory not found
    pause
    exit /b 1
)

echo Starting deployment preparation...
echo.

REM Build frontend
echo 🔨 Building frontend...
cd devconnect-app
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)
echo ✅ Frontend built successfully!
echo 📁 Build output: devconnect-app/dist/
cd ..

echo.

REM Prepare backend
echo 🔧 Preparing backend...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend dependency installation failed!
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed!
cd ..

echo.

REM Check readiness
echo 🔍 Checking deployment readiness...

if not exist "server\PRODUCTION_CONFIG.md" (
    echo ⚠️  Warning: Production config not found
)

if not exist "render.yaml" (
    echo ⚠️  Warning: Render.com config not found
)

if not exist "railway.json" (
    echo ⚠️  Warning: Railway.app config not found
)

echo ✅ Ready for deployment!

echo.
echo 🎯 Deployment Options:
echo ======================
echo.
echo 1. 🚀 Render.com (Recommended - Free)
echo    - Go to: https://render.com
echo    - Connect your GitHub repository
echo    - Use render.yaml configuration
echo.
echo 2. 🚂 Railway.app (Free Backend)
echo    - Go to: https://railway.app
echo    - Connect your GitHub repository
echo    - Use railway.json configuration
echo.
echo 3. 🎪 Heroku (Paid)
echo    - Go to: https://heroku.com
echo    - Connect your GitHub repository
echo    - Set environment variables manually
echo.
echo 4. 📚 Manual Deployment
echo    - Build frontend: npm run build
echo    - Deploy dist folder to any static hosting
echo    - Deploy server to any Node.js hosting

echo.
echo 📋 Next Steps:
echo ==============
echo 1. Push your code to GitHub
echo 2. Choose a deployment platform from above
echo 3. Follow the DEPLOYMENT_GUIDE.md instructions
echo 4. Set up MongoDB Atlas for production database
echo 5. Configure environment variables
echo.
echo 🎉 Your DevConnect app is ready for deployment!
echo.
echo 📖 For detailed instructions, see: DEPLOYMENT_GUIDE.md
echo.
pause
