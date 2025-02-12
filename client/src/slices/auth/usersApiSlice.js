import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users'

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            })
        })
    }
})

export {userApiSlice}
export const {useLoginMutation} = userApiSlice;