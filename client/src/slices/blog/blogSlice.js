import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { setCurrentBlogId } from "../editor/editorSlice";
import { base64ToBlob } from "../../utils/base64ToBlob";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    blogs: [],
    drafts: [],
    loading: false,
    error: null,
}

export const uploadImage = createAsyncThunk(
    'blog/upload_image',
    async (data, { rejectWithValue }) => {
        console.log(data)
        try {
            if (data.type === "contentImage") {
                const formData = new FormData()
                formData.append([data.type], data.image, 'image')
                const response = await axios.post(`/api/blog/upload_content_image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                console.log("SENDING DATA")
                console.log(response.data)
                return response.data
            } else {
                const blobImage = base64ToBlob(data.base64String)
                const formData = new FormData()
                formData.append([data.type], blobImage, 'image');
                console.log(formData)
                const response = await axios.post(`/api/blog/upload_title_image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                console.log("successful uploading of cropped image")
                return response.data
            }

        } catch (error) {
            return rejectWithValue("Failed to upload image"); // Proper error handling
        }
    }
)

export const postBlog = createAsyncThunk(
    'blog/post_blog',
    async (data) => {

        let { blogData } = data;
        console.log(blogData)
        blogData = {
            content: blogData.model,
            ...blogData
        }
        
        const request = await axios.post(`/api/blog/post_blog`, blogData, {
        });


        const response = request.data;
        return response
    }
)

export const fetchAllBlogs = createAsyncThunk('blog/fetch_blog',
    async () => {
        const request = await axios.get('/api/blog/fetch_blogs')
        const response = request.data;
        return response
    })


export const fetchDrafts = createAsyncThunk('blog/fetch_drafts',
    async () => {
        const response = await axios.get(`/api/blog/fetch_drafts`)
        return response.data
    })


const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        sortByDate: (state, action) => {
            const { type, sortBy } = action.payload
            if (type === "drafts") {
                if (sortBy === "recent")
                    state.drafts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                else {
                    state.drafts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                }
                return
            } else {
                if (sortBy === "recent") {
                    state.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                } else {
                    state.blogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                }

            }
        }
    },
    extraReducers: (builder) => {
        builder
            // //! POST BLOG or DRAFT
            // //*1
            .addCase(postBlog.pending, (state) => {
                state.loading = true
                state.error = null
            })
            //*2
            .addCase(postBlog.fulfilled, (state, action) => {
                if (action.payload.status === "published") {
                    state.blogs.unshift(action.payload)
                } else {
                    const existingDraftIndex = state.drafts.findIndex(
                        (draft) => draft._id === action.payload._id
                    );
                    if (existingDraftIndex >= 0) {
                        state.drafts[existingDraftIndex] = action.payload
                    } else {
                        state.drafts.unshift(action.payload);
                    }
                }
                state.loading = false
                state.error = null
            })
            //*3
            .addCase(postBlog.rejected, (state, action) => {
                state.loading = false
                console.log(action.error)
                if (action.error.message === "Request failed with status code 401") {
                    state.error = "Access Denied! Invalid credentials"
                } else {
                    state.error = action.error.message
                }
            })
            //! FETCH ALL BLOGS
            //*1
            .addCase(fetchAllBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            //*2
            .addCase(fetchAllBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blogs = action.payload; // Store fetched blogs in state
            })
            //*3
            .addCase(fetchAllBlogs.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error);
                state.error = action.error.message;
            })
            //!FETCH ALL DRAFTS
            //*1
            .addCase(fetchDrafts.pending, (state) => {
                state.loading = true
                state.error = false
                state.drafts = []
            })
            //*2
            .addCase(fetchDrafts.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.drafts = action.payload
            })
            //*3
            .addCase(fetchDrafts.rejected, (state, action) => {
                state.loading = false
                state.drafts = []
                console.log(action.error)
                if (action.error.message === "Request failed with status code 401") {
                    state.error = "Session expired! Login again."
                } else {
                    state.error = action.error.message
                }
            })

    }
})

export const { sortByDate } = blogSlice.actions

export default blogSlice.reducer