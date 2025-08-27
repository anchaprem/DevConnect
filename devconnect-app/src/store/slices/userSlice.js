import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage on initialization
const loadUserFromStorage = () => {
    try {
        const userData = localStorage.getItem('devconnect_user');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error loading user from localStorage:', error);
        return null;
    }
};

const userSlice = createSlice({
    name: "user",
    initialState: loadUserFromStorage(),
    reducers: {
        addUser: (state, action) => {
            const userData = action.payload;
            // Save to localStorage
            try {
                localStorage.setItem('devconnect_user', JSON.stringify(userData));
            } catch (error) {
                console.error('Error saving user to localStorage:', error);
            }
            return userData;
        },
        removeUser: (state) => {
            // Remove from localStorage
            try {
                localStorage.removeItem('devconnect_user');
            } catch (error) {
                console.error('Error removing user from localStorage:', error);
            }
            return null;
        }
    }
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
