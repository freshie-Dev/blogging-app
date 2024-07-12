import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    loading: false,
    error: null,
}

export const loginUser = createAsyncThunk(
    'users/auth',
    async (userCredendials) => {
        const request = await axios.post('/api/users/auth', userCredendials)
        const response = request.data;
        localStorage.setItem('userInfo', JSON.stringify(response))
        return response
    }
)

export const logoutUser = createAsyncThunk(
    'users/logout',
    async () => {
        const request = await axios.post('/api/users/logout')
        const response = request.data;
        localStorage.clear()
        return response
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (newCredentials) => {
        const request = await axios.put('/api/users/profile', newCredentials)
        const response = request.data;
        localStorage.setItem('userInfo', JSON.stringify(response))
        return response
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            //* LOGIN CASES
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.userInfo = null
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.userInfo = action.payload
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.userInfo = null
                console.log(action.error)
                if (action.error.message === "Request failed with status code 401") {
                    state.error = "Access Denied! Invalid credentials"
                } else {
                    state.error = action.error.message
                }
            })

            //! LOGOUT CASES
            // Logout cases
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.userInfo = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //^ UPDATE USER CASES
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error.code)
                if (action.error.message === "Request failed with status code 401") {
                    state.error = "Incorrect current password";
                } else {
                    state.error = action.error.name
                }
            });
    }
})

export const { } = authSlice.actions

export default authSlice.reducer