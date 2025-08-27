#!/bin/bash

echo "🚀 DevConnect Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "devconnect-app" ] || [ ! -d "server" ]; then
    echo "❌ Error: Please run this script from the root DevConnect directory"
    exit 1
fi

# Function to build frontend
build_frontend() {
    echo "🔨 Building frontend..."
    cd devconnect-app
    
    if npm run build; then
        echo "✅ Frontend built successfully!"
        echo "📁 Build output: devconnect-app/dist/"
    else
        echo "❌ Frontend build failed!"
        exit 1
    fi
    
    cd ..
}

# Function to prepare backend
prepare_backend() {
    echo "🔧 Preparing backend..."
    cd server
    
    if npm install; then
        echo "✅ Backend dependencies installed!"
    else
        echo "❌ Backend dependency installation failed!"
        exit 1
    fi
    
    cd ..
}

# Function to check deployment readiness
check_readiness() {
    echo "🔍 Checking deployment readiness..."
    
    # Check if production config exists
    if [ ! -f "server/PRODUCTION_CONFIG.md" ]; then
        echo "⚠️  Warning: Production config not found"
    fi
    
    # Check if render.yaml exists
    if [ ! -f "render.yaml" ]; then
        echo "⚠️  Warning: Render.com config not found"
    fi
    
    # Check if railway.json exists
    if [ ! -f "railway.json" ]; then
        echo "⚠️  Warning: Railway.app config not found"
    fi
    
    echo "✅ Ready for deployment!"
}

# Function to show deployment options
show_deployment_options() {
    echo ""
    echo "🎯 Deployment Options:"
    echo "======================"
    echo ""
    echo "1. 🚀 Render.com (Recommended - Free)"
    echo "   - Go to: https://render.com"
    echo "   - Connect your GitHub repository"
    echo "   - Use render.yaml configuration"
    echo ""
    echo "2. 🚂 Railway.app (Free Backend)"
    echo "   - Go to: https://railway.app"
    echo "   - Connect your GitHub repository"
    echo "   - Use railway.json configuration"
    echo ""
    echo "3. 🎪 Heroku (Paid)"
    echo "   - Go to: https://heroku.com"
    echo "   - Connect your GitHub repository"
    echo "   - Set environment variables manually"
    echo ""
    echo "4. 📚 Manual Deployment"
    echo "   - Build frontend: npm run build"
    echo "   - Deploy dist folder to any static hosting"
    echo "   - Deploy server to any Node.js hosting"
}

# Main execution
echo "Starting deployment preparation..."
echo ""

# Build frontend
build_frontend

echo ""

# Prepare backend
prepare_backend

echo ""

# Check readiness
check_readiness

echo ""

# Show deployment options
show_deployment_options

echo ""
echo "📋 Next Steps:"
echo "=============="
echo "1. Push your code to GitHub"
echo "2. Choose a deployment platform from above"
echo "3. Follow the DEPLOYMENT_GUIDE.md instructions"
echo "4. Set up MongoDB Atlas for production database"
echo "5. Configure environment variables"
echo ""
echo "🎉 Your DevConnect app is ready for deployment!"
echo ""
echo "📖 For detailed instructions, see: DEPLOYMENT_GUIDE.md"
