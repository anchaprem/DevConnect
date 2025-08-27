import axios from 'axios';
import { getCurrentConfig } from '../config/production';

// Get current configuration
const config = getCurrentConfig();

// Create axios instance with dynamic config
const api = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for adding auth headers and logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      data: config.data,
      params: config.params,
      headers: config.headers,
      environment: getCurrentConfig().deploymentType
    });
    
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors and logging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`, {
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
      environment: getCurrentConfig().deploymentType
    });
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log('🔒 Unauthorized access - user needs to login');
      // You could redirect to login here
    } else if (error.response?.status === 404) {
      console.log('🔍 Resource not found');
    } else if (error.response?.status >= 500) {
      console.log('💥 Server error');
    }
    
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  signup: (userData) => api.post('/auth', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'), // Fixed: Changed from GET to POST
};

// Profile API endpoints
export const profileAPI = {
  view: () => api.get('/profile/view'),
  edit: (profileData) => api.patch('/profile/edit', profileData),
  changePassword: (passwordData) => api.post('/profile/password', passwordData),
};

// Connection Request API endpoints
export const connectionAPI = {
  sendRequest: (status, toUserId) => api.post(`/requests/send/${status}/${toUserId}`),
  reviewRequest: (status, requestId) => api.post(`/requests/review/${status}/${requestId}`), // Fixed: Changed from GET to POST
};

// User API endpoints
export const userAPI = {
  getReceivedRequests: () => api.get('/user/requests/received'),
  getPendingConnections: () => api.get('/user/requests/pending'),
  getConnections: () => api.get('/user/connections'),
  getFeed: (page = 1, limit = 10) => api.get(`/user/feed?page=${page}&limit=${limit}`),
};

// Utility function to test API connectivity
export const testAPIConnection = async () => {
  try {
    const response = await api.get('/health');
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText
    };
  }
};

// Get current deployment info
export const getDeploymentInfo = () => {
  return {
    ...getCurrentConfig(),
    currentUrl: window.location.href,
    isGitHubPages: window.location.hostname.includes('github.io'),
    isProduction: !import.meta.env.DEV
  };
};

export default api;
