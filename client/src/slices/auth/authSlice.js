import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    userInfo: null,
    loading: false,
    error: null,
}

export const loginUser = createAsyncThunk(
    'auth/login',
    async(userCredendials) => {
        const request = await axios.post('/api/users/auth', userCredendials)
        const response = request.data;
        return response
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async() => {
        const request = await axios.post('/api/users/logout')
        const response = request.data;
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
            if(action.error.message === "Request failed with status code 401") {
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
    }
})

export const {setCredentials, logout} = authSlice.actions

export default authSlice.reducer