import React, { useEffect, useState } from 'react'
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView.js"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBlogs, sortByDate } from '../slices/blog/blogSlice'
import { formatIsoToDate } from '../utils/formatData'
import LogoutModal from '../components/Modals/logoutModal'

const BlogsPage = () => {
    const dispatch = useDispatch()
    const { blogs, loading, error } = useSelector(state => state.blog)
    const [openModal, setOpenModal] = useState(false)

    const [showContent, setShowContent] = useState({
        open: false,
        blogId: null
    })
    useEffect(() => {
        async function fetchBlogs() {
            const response = await dispatch(fetchAllBlogs())
        }
        fetchBlogs()
    }, [])

    const handleShowContent = (choice, blogId) => {
        setShowContent({
            open: !showContent.choice,
            blogId: blogId !== showContent.blogId ? blogId : null
        })
    }


    useEffect(() => {
        // Automatically open modal if there's an error
        if (error) {
            setOpenModal(true);
        }
    }, [error])


    if (loading) return <h1>Loaading...</h1>
    if (error) return (
        <div>
            {error && (
                <LogoutModal
                    open={openModal}
                    setOpen={setOpenModal}
                    title="Session Expired!"
                    errorMessage="Please login again to continue." // Pass error message to the modal
                />
            )}
        </div>
    )
    return (
        <div className='container grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-2 xl:grid-row-3'>
            {/* <select name="" id="" className=''>
                <option value="recent" onClick={() => dispatch(sortByDate({ type: "blogs", sortBy: "recent" }))}>Recent</option>
                <option value="oldest" onClick={() => dispatch(sortByDate({ type: "blogs", sortBy: "oldest" }))}>Oldest</option>
            </select> */}
            {blogs.map((blog, index) => {
                return (
                    <div key={blog._id}
                        className={`flex flex-col gap-4 bg-gray-100 rounded-md item item-${index + 1}`}>
                        <img className='rounded-md w-[]100%' src={blog.titleImage} alt="" />
                        <div className='flex flex-col justify-between w-full'>
                            <h2 className=' text-xl font-[600] text-gray-700'>{blog.title}</h2>
                            <div className='max-h-[150px] p-2 text-md overflow-scroll'>
                                <span className=''><FroalaEditorView model={blog.content} /></span>
                            </div>
                        </div>
                        <div className=' text-gray-600 bg-slate-200 px-4 py-1 rounded-md'>
                            <p className='float-left'>{blog.author.name}</p>
                            <p className='float-right'>{formatIsoToDate(blog.createdAt)}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default BlogsPage