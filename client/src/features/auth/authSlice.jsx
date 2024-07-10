import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: null,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
    }
})

// const {addUser} = auth.actions

// export {addUser}
export default authSlice.reducer