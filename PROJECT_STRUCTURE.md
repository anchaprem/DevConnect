# 🏗️ DevConnect Project Structure

## 📁 Root Directory Structure

```
DevConnect/
├── 📄 package.json                 # Root package.json with unified scripts
├── 📄 PROJECT_STRUCTURE.md         # This file - project documentation
├── 📄 start-app.bat               # Windows startup script
├── 📄 start-app.sh                # Linux/Mac startup script
├── 📄 .env.example                # Environment variables template
├── 📁 server/                     # Backend server code
│   ├── 📄 package.json            # Server dependencies
│   ├── 📁 src/                    # Server source code
│   │   ├── 📄 app.js              # Main server entry point
│   │   ├── 📁 config/             # Configuration files
│   │   ├── 📁 middlewares/        # Express middlewares
│   │   ├── 📁 models/             # MongoDB models
│   │   ├── 📁 routes/             # API route handlers
│   │   └── 📁 utils/              # Utility functions
│   ├── 📁 scripts/                # Database scripts
│   └── 📁 tests/                  # Server tests
└── 📁 devconnect-app/             # Frontend React application
    ├── 📄 package.json            # Client dependencies
    ├── 📁 public/                 # Static assets
    ├── 📁 src/                    # React source code
    │   ├── 📄 main.jsx            # React entry point
    │   ├── 📄 App.jsx             # Main app component
    │   ├── 📁 Components/         # Reusable components
    │   ├── 📁 pages/              # Page components
    │   ├── 📁 services/           # API services
    │   ├── 📁 store/              # Redux store
    │   └── 📁 styles/             # CSS and styling
    └── 📁 dist/                   # Build output
```

## 🔧 Unified Package Management

### Root Scripts (from root package.json)
```bash
# Development
npm run dev                    # Start both server and client in dev mode
npm run server:dev            # Start only server in dev mode
npm run client:dev            # Start only client in dev mode

# Production
npm start                     # Start production server
npm run build                # Build client for production
npm run client:preview       # Preview production build

# Installation & Maintenance
npm run install:all          # Install all dependencies
npm run install:server       # Install only server dependencies
npm run install:client       # Install only client dependencies
npm run clean                # Remove all node_modules
npm run reset                # Clean and reinstall everything

# Code Quality
npm run lint                 # Lint both server and client
npm run lint:server          # Lint only server
npm run lint:client          # Lint only client
```

## 🚀 Quick Start Commands

### First Time Setup
```bash
# 1. Install root dependencies
npm install

# 2. Install all project dependencies
npm run install:all

# 3. Start development environment
npm run dev
```

### Individual Services
```bash
# Backend only
npm run server:dev

# Frontend only  
npm run client:dev

# Production backend
npm run server:start
```

## 📊 Dependency Management Strategy

### Root Level
- **concurrently**: Run multiple commands simultaneously
- **Workspaces**: Manage multiple packages efficiently

### Server Dependencies
- **Core**: Express, MongoDB, JWT, bcrypt
- **Security**: CORS, rate limiting, validation
- **Development**: Nodemon, ESLint, Jest

### Client Dependencies  
- **Core**: React, Vite, Redux Toolkit
- **UI**: Tailwind CSS, DaisyUI
- **Development**: ESLint, Prettier, PostCSS

## 🌍 Environment Configuration

### Server Environment Variables
```bash
# Create .env file in server/ directory
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/devconnect
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:5173
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
MAX_FILE_SIZE=5242880
DEFAULT_PAGE_SIZE=10
MAX_PAGE_SIZE=50
```

### Client Environment Variables
```bash
# Create .env file in devconnect-app/ directory
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=DevConnect
VITE_APP_VERSION=1.0.0
```

## 🔒 Security Features

### Server Security
- **Rate Limiting**: Prevent API abuse
- **CORS Protection**: Control cross-origin requests
- **Input Validation**: Sanitize all user inputs
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with configurable rounds

### Client Security
- **Protected Routes**: Authentication guards
- **API Interceptors**: Automatic error handling
- **Secure Storage**: No sensitive data in localStorage

## 📱 Development Workflow

### 1. **Development Mode**
```bash
npm run dev
# Starts both server (port 3000) and client (port 5173)
# Hot reload enabled for both
```

### 2. **Production Build**
```bash
npm run build
# Builds optimized client bundle
# Server runs in production mode
```

### 3. **Testing**
```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode for tests
```

### 4. **Code Quality**
```bash
npm run lint              # Check code quality
npm run lint:fix          # Auto-fix linting issues
npm run format            # Format code with Prettier
```

## 🗄️ Database Management

### Scripts
```bash
npm run db:seed           # Populate database with sample data
npm run db:reset          # Reset database (development only)
```

### Models
- **User**: Authentication and profile data
- **ConnectionRequest**: Network connection management

## 🌐 API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User authentication  
- `POST /logout` - User logout

### Profile Management
- `GET /profile/view` - View user profile
- `PATCH /profile/edit` - Edit user profile
- `POST /profile/password` - Change password

### Networking
- `GET /user/feed` - Discover developers
- `POST /request/send/:status/:userId` - Send connection request
- `POST /request/review/:status/:requestId` - Review request
- `GET /user/connections` - Get user connections
- `GET /user/requests/received` - Get pending requests

## 🎨 Frontend Architecture

### Component Structure
```
Components/
├── auth/           # Authentication components
├── common/         # Reusable UI components  
├── layout/         # Layout and navigation
└── index.js        # Component exports

pages/
├── auth/           # Authentication pages
├── errors/         # Error handling pages
└── main/           # Main application pages
```

### State Management
- **Redux Toolkit**: Centralized state management
- **User Slice**: Authentication and user data
- **API Services**: Centralized API communication

## 🚀 Deployment Strategy

### Frontend Deployment
```bash
npm run build
# Deploy dist/ folder to CDN/hosting service
```

### Backend Deployment
```bash
npm run server:start
# Deploy to cloud platform (Heroku, AWS, etc.)
```

### Environment Setup
- Set production environment variables
- Configure production database
- Set up monitoring and logging

## 🔧 Maintenance Commands

### Clean Installation
```bash
npm run clean              # Remove all node_modules
npm run reset              # Clean and reinstall everything
```

### Update Dependencies
```bash
npm update                 # Update all dependencies
npm audit fix             # Fix security vulnerabilities
```

## 📝 Best Practices

### Code Organization
- **Separation of Concerns**: Clear separation between layers
- **Modular Architecture**: Reusable components and services
- **Consistent Naming**: Follow established conventions

### Development
- **Hot Reload**: Fast development iteration
- **Error Handling**: Comprehensive error management
- **Logging**: Detailed logging for debugging

### Security
- **Input Validation**: Validate all user inputs
- **Authentication**: Secure JWT implementation
- **Rate Limiting**: Prevent API abuse

---

**This structure provides a clean, maintainable, and scalable architecture for the DevConnect application.**
