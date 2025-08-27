# 🚀 DevConnect Setup Guide

## 🎯 **Project Reorganization Complete!**

Your DevConnect project has been reorganized with a unified package structure, eliminating duplicate `node_modules` and providing better organization.

## 📁 **New Project Structure**

```
DevConnect/
├── 📄 package.json                 # 🆕 Root package.json (unified management)
├── 📄 PROJECT_STRUCTURE.md         # 📋 Complete project documentation
├── 📄 SETUP_GUIDE.md              # 📖 This setup guide
├── 📄 env.template                 # 🔧 Environment variables template
├── 📄 start-app.bat               # 🪟 Windows startup script (updated)
├── 📄 start-app.sh                # 🐧 Linux/Mac startup script (updated)
├── 📁 server/                     # 🔧 Backend server
│   ├── 📄 package.json            # Server dependencies
│   ├── 📁 src/                    # Server source code
│   │   ├── 📁 config/             # 🆕 Configuration files
│   │   ├── 📁 middlewares/        # 🆕 Express middlewares
│   │   ├── 📁 models/             # Database models
│   │   ├── 📁 routes/             # API routes
│   │   └── 📁 utils/              # Utility functions
│   └── 📁 scripts/                # 🆕 Database scripts
└── 📁 devconnect-app/             # 🎨 Frontend React app
    ├── 📄 package.json            # Client dependencies
    └── 📁 src/                    # React source code
```

## 🔧 **What's New & Improved**

### ✅ **Unified Package Management**
- **Single root `package.json`** with workspace management
- **No more duplicate `node_modules`** folders
- **Unified scripts** for development and production
- **Efficient dependency management** with npm workspaces

### ✅ **Enhanced Server Structure**
- **Centralized configuration** (`config/config.js`)
- **Error handling middleware** (`middlewares/errorHandler.js`)
- **Rate limiting** (`middlewares/rateLimiter.js`)
- **Database scripts** for seeding and resetting
- **Better logging** and development experience

### ✅ **Improved Development Experience**
- **Single command** to start both server and client
- **Hot reload** for both frontend and backend
- **Unified linting** and code quality tools
- **Better error handling** and debugging

## 🚀 **Quick Start (Updated)**

### **Option 1: Use Startup Scripts (Recommended)**
```bash
# Windows
start-app.bat

# Linux/Mac
chmod +x start-app.sh
./start-app.sh
```

### **Option 2: Manual Setup**
```bash
# 1. Install root dependencies
npm install

# 2. Install all project dependencies
npm run install:all

# 3. Start development environment
npm run dev
```

## 📋 **Available Commands**

### **Development**
```bash
npm run dev                    # 🚀 Start both server and client
npm run server:dev            # 🔧 Start only server
npm run client:dev            # 🎨 Start only client
```

### **Production**
```bash
npm start                     # 🚀 Start production server
npm run build                # 📦 Build client for production
npm run client:preview       # 👀 Preview production build
```

### **Database Management**
```bash
npm run db:seed              # 🌱 Populate database with sample data
npm run db:reset             # 🗑️ Reset database (development only)
```

### **Maintenance**
```bash
npm run clean                # 🧹 Remove all node_modules
npm run reset                # 🔄 Clean and reinstall everything
npm run lint                 # ✅ Lint both server and client
```

## 🌍 **Environment Setup**

### **1. Create Server Environment File**
```bash
# Copy template to server directory
cp env.template server/.env

# Edit server/.env with your values
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/devconnect
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:5173
```

### **2. Create Client Environment File**
```bash
# Create .env in devconnect-app directory
cd devconnect-app
echo "VITE_API_BASE_URL=http://localhost:3000" > .env
echo "VITE_APP_NAME=DevConnect" >> .env
echo "VITE_APP_VERSION=1.0.0" >> .env
cd ..
```

## 🗄️ **Database Setup**

### **1. Ensure MongoDB is Running**
```bash
# Start MongoDB (if not running)
mongod
```

### **2. Seed Database with Sample Data**
```bash
npm run db:seed
```

This will create 8 sample users with different skills and some connection requests for testing.

### **3. Sample Login Credentials**
```
Email: john@devconnect.com    Password: Password123!
Email: sarah@devconnect.com   Password: Password123!
Email: mike@devconnect.com    Password: Password123!
Email: emily@devconnect.com   Password: Password123!
Email: alex@devconnect.com    Password: Password123!
Email: lisa@devconnect.com    Password: Password123!
Email: david@devconnect.com   Password: Password123!
Email: rachel@devconnect.com  Password: Password123!
```

## 🔄 **Migration from Old Structure**

### **If you had the old setup:**
1. **Stop any running servers** (Ctrl+C in terminal windows)
2. **Delete old node_modules folders**:
   ```bash
   rm -rf server/node_modules
   rm -rf devconnect-app/node_modules
   rm -rf node_modules
   ```
3. **Follow the new setup guide above**

### **Benefits of the new structure:**
- ✅ **Faster installation** (no duplicate dependencies)
- ✅ **Easier maintenance** (unified scripts)
- ✅ **Better organization** (clear separation of concerns)
- ✅ **Professional structure** (industry-standard layout)

## 🐛 **Troubleshooting**

### **Common Issues & Solutions**

#### **Port Already in Use**
```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### **MongoDB Connection Issues**
```bash
# Ensure MongoDB is running
mongod

# Check connection string in server/.env
MONGODB_URI=mongodb://localhost:27017/devconnect
```

#### **Dependency Issues**
```bash
# Clean and reinstall
npm run reset
```

#### **Permission Issues (Linux/Mac)**
```bash
# Make startup script executable
chmod +x start-app.sh
```

## 🎉 **You're All Set!**

Your DevConnect application is now:
- ✅ **Better organized** with professional structure
- ✅ **Easier to maintain** with unified scripts
- ✅ **More efficient** with workspace management
- ✅ **Ready for production** with proper configuration

### **Next Steps:**
1. **Start the application**: `npm run dev`
2. **Seed the database**: `npm run db:seed`
3. **Explore the features**: Login with sample accounts
4. **Customize**: Modify profiles, add skills, make connections

---

**Happy Coding! 👽🔗**

*Your DevConnect application is now production-ready with a professional architecture.*
