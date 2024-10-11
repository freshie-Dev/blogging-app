import React, { useState } from 'react';
import Editor from './Editor';
import TagInput from '../tag-input/TagInput';
import { resetEditor, setCurrentBlogId, setTitle } from '../../slices/editor/editorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { postBlog } from '../../slices/blog/blogSlice';
import BasicButton from '../button/button';
import { Resizable } from "react-resizable";
import 'react-resizable/css/styles.css'; // Import default styles for resizing
import FileInput from '../file-input/FileInput';
import EditorView from '../editor-view/EditorView';

const Blog = () => {
  const dispatch = useDispatch();
  const { model, title, tags, titleImage, currentBlogId } = useSelector(state => state.editor);
  const { userInfo} = useSelector(state => state.auth)


  // State for the width of the resizable div
  const [width, setWidth] = useState(700);

  const onResize = (event, { size }) => {
    setWidth(size.width);
  };

  const handlePostBlog = async (status) => {
    if (!(model.length && tags.length && title.length && titleImage)) {
      alert("Please fill all fields before proceeding.");
      return;
    }
    

    const data = {
      blogData: { model, title, tags, currentBlogId, status, titleImage },
    }

    const response = await dispatch(postBlog(data));

    if (response.payload.status === "draft") {
      dispatch(setCurrentBlogId(response.payload._id));
      return;
    }
    // dispatch(resetEditor());
  };

  return (
    // <Resizable
    //   width={width}
    //   height={0} // The height can remain fixed, or you can also make it resizable
    //   onResize={onResize}
    //   minConstraints={[400, 200]} // Minimum width and height
    //   maxConstraints={[1200, Infinity]} // Maximum width
    //   className='static'

    // >
      <div
        className='flex flex-col gap-2  mb-[100px] max-w-[700px] w-full'
        // style={{ width: `${width}px` }}
      >
        <h1 className='font-semibold -300 h-full'>Create Your Blog</h1>

        <div className='flex justify-between gap-2 items-center'>
          <div className='flex gap-1 flex-col flex-[1.6]'>
            <input
              className='h-[40px] rounded-md border-[1px] border-gray-300 outline-none px-2 text-gray-600'
              type="text"
              name='title'
              placeholder='Blog Title'
              value={title}
              onChange={e => dispatch(setTitle(e.target.value))}
            />

            <TagInput />
          </div>

          <div className='flex flex-col gap-1 flex-[0.4]'>
            <BasicButton className='block' text="POST BLOG" onClick={() => handlePostBlog('published')} />
            <BasicButton className='block' text="SAVE DRAFT" onClick={() => handlePostBlog('draft')} />
          </div>
        </div>
        <FileInput />

        <Editor />
        <EditorView/>

      </div>
    // </Resizable>
  );
};

export default Blog;
