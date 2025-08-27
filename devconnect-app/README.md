# 🚀 DevConnect - Developer Networking Platform

A modern, full-stack web application designed to connect developers worldwide. Built with React, Node.js, and MongoDB, featuring a beautiful developer-themed UI and robust networking capabilities.

## ✨ Features

### 🔐 Authentication & User Management
- **Secure Signup/Login**: JWT-based authentication with bcrypt password hashing
- **Profile Management**: Complete profile editing with skills, bio, and photo
- **Session Validation**: Automatic session verification and renewal

### 👥 Developer Networking
- **Smart Feed**: Discover developers based on your network and preferences
- **Connection Requests**: Send and manage connection requests
- **Professional Profiles**: Showcase skills, experience, and projects
- **Network Management**: View and manage your professional connections

### 🎨 Developer-Themed UI
- **Modern Design**: Clean, professional interface with developer aesthetics
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Smooth animations and hover effects
- **Dark/Light Mode**: Built-in theme support with DaisyUI

### 🔧 Technical Features
- **Real-time Updates**: Live connection counts and request notifications
- **Pagination**: Efficient data loading with infinite scroll
- **Error Handling**: Comprehensive error pages and user feedback
- **Performance**: Optimized API calls and state management

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library built on Tailwind
- **Redux Toolkit** - State management
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Hot Reload** - Instant development feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DevConnect
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd devconnect-app
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   ```bash
   # In server directory, create .env file
   MONGODB_URI=mongodb://localhost:27017/devconnect
   JWT_SECRET=your-secret-key
   PORT=3000
   ```

4. **Start the application**
   ```bash
   # Start backend server (from server directory)
   npm start
   
   # Start frontend (from devconnect-app directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## 📱 Application Structure

### Frontend Routes
- `/login` - User authentication
- `/signup` - User registration
- `/feed` - Developer discovery feed
- `/connections` - Network management
- `/profile` - User profile editing

### Backend API Endpoints
- `POST /signup` - User registration
- `POST /login` - User authentication
- `POST /logout` - User logout
- `GET /profile/view` - View user profile
- `PATCH /profile/edit` - Edit user profile
- `GET /user/feed` - Get developer feed
- `POST /request/send/:status/:userId` - Send connection request
- `POST /request/review/:status/:requestId` - Review connection request

## 🎯 Key Features Explained

### Smart Feed Algorithm
The feed intelligently shows developers you haven't connected with yet, excluding:
- Users you've already sent requests to
- Users you've ignored
- Your existing connections
- Yourself

### Connection System
- **Interested**: Send a connection request
- **Ignore**: Remove from feed without connecting
- **Accept/Reject**: Respond to incoming requests
- **Real-time Updates**: Live notification badges

### Profile Management
- **Skills**: Add/remove technical skills with badges
- **About**: Rich text description of your work
- **Photo**: Custom profile picture support
- **Demographics**: Age, gender, and location info

## 🔒 Security Features

- **JWT Authentication**: Secure token-based sessions
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Comprehensive data validation
- **CORS Protection**: Cross-origin request security
- **Session Management**: Automatic token validation

## 🚀 Deployment

### Frontend Deployment
```bash
cd devconnect-app
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd server
npm install --production
# Deploy to your server/cloud platform
```

### Environment Variables
Ensure these are set in production:
- `MONGODB_URI` - Production MongoDB connection string
- `JWT_SECRET` - Strong, unique secret key
- `NODE_ENV` - Set to "production"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **DaisyUI** for beautiful components
- **Tailwind CSS** for utility-first styling
- **React Community** for amazing tools and libraries
- **Developer Community** for inspiration and feedback

## 📞 Support

- **Issues**: Report bugs and feature requests on GitHub
- **Documentation**: Check the code comments for detailed explanations
- **Community**: Join our developer community discussions

---

**Built with ❤️ for the Developer Community**

*Connect, Collaborate, Code Together* 👽🔗