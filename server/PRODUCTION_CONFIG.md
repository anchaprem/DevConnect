# Production Deployment Configuration

## Environment Variables for Production

Create a `.env` file in your server directory with these variables:

```bash
# Production Environment Variables
NODE_ENV=production
PORT=3000

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devconnect

# JWT Configuration
JWT_SECRET=your-super-secure-production-jwt-secret-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration (comma-separated URLs)
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com

# Security Configuration
BCRYPT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# File Upload Limits
MAX_FILE_SIZE=5242880

# Pagination
DEFAULT_PAGE_SIZE=10
MAX_PAGE_SIZE=50
```

## Important Notes:
1. **JWT_SECRET**: Use a strong, unique secret key
2. **MONGODB_URI**: Use MongoDB Atlas or your production database
3. **CORS_ORIGIN**: Set to your actual frontend domain
4. **NODE_ENV**: Must be set to 'production'
