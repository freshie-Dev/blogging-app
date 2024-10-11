import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentBlogId: null, //if not new blog
    title: '',
    tags: [],
    model: '',
    titleImage: null,

}

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setCurrentBlogId: (state, action) => {
            console.log("setting current blog id to ", action.payload)
            state.currentBlogId = action.payload
            localStorage.setItem('currentBlogId', action.payload)
        },
        setModel: (state, action) => {
            state.model = action.payload
            localStorage.setItem('blogModel', action.payload)
        },
        setTitle: (state, action) => {
            state.title = action.payload
            localStorage.setItem('blogTitle', JSON.stringify(action.payload))
        },
        setTags: (state, action) => {
            state.tags.push(action.payload)
            localStorage.setItem('blogTags', JSON.stringify(state.tags))
        },
        removeTag: (state, action) => {
            state.tags = state.tags.filter((tag, index) => index !== action.payload);
            localStorage.setItem('blogTags', JSON.stringify(state.tags))
        },
        setTitleImage: (state, action) => {
            state.titleImage = action.payload;
            // localStorage.setItem('blogTitleImage', action.payload)
        },
        setEditor: (state, action) => {
            const { _id, title, tags, content } = action.payload
            state.currentBlogId = //if not new blog
                state.title = title
            state.tags = tags
            state.model = content
        },
        resetEditor: (state, action) => {
            state.currentBlogId = null //if not new blog
            state.title = ''
            state.tags = []
            state.model = ''
        }
    }
})

export const { setCurrentBlogId, setModel, setTitle, setTags, removeTag, setTitleImage, setEditor, resetEditor } = editorSlice.actions
export default editorSlice.reducer