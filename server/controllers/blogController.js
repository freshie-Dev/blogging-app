import Blog from "../models/blogModel.js";


//^ POST: uplaoding single file of each blog
export const uploadSingleFile = async (req, res) => {

    let {email, _id} = req.user
    email = email.split('@')[0]
    _id = _id.toString()
    console.log(req.file)
    res.json({ 
        link: `http://localhost:${process.env.PORT}/uploads/blogs/${email}/${_id}/${req.file.filename}`,
        type: `${req.file.fieldname}`
    });
}

//^ POST: Posting a new blog OR save draft
export const postBlog = async (req, res) => {
    const { currentBlogId, title, tags, content, status, titleImage } = req.body
    const user = req.user
    console.log(req.body)
    if (currentBlogId) {
        let draft = await Blog.findOne({ _id: currentBlogId })
        draft.title = title
        draft.tags = tags
        draft.content = content
        const updatedDraft = await draft.save()
        res.status(200).json(updatedDraft)
    }
    const newBlog = new Blog({
        title,
        content,
        tags,
        author: user._id,
        status,
        titleImage,
    })

    const savedBlog = await newBlog.save()

    user.blogs.push(savedBlog._id)
    await user.save();

    res.status(200).json(savedBlog)
}

//^ GET: fetching all user blogs.
export const fetchBlogs = async (req, res) => {
    let user = req.user
    const blogs = await Blog.find({ author: user._id, status: 'published' }).populate('author', 'name email');
    console.log(blogs)
    res.status(200).json(blogs)
}

//^ GET: fetching all user drafts.
export const fetchDrafts = async (req, res) => {
    let user = req.user
    const drafts = await Blog.find({ author: user._id, status: 'draft' }).populate('author', 'name email');
    console.log(drafts)
    res.status(200).json(drafts)
}

