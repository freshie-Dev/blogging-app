import React from 'react'

import FroalaEditorComponent from 'react-froala-wysiwyg';


import { v4 as uuidv4 } from 'uuid';

import 'froala-editor/js/plugins.pkgd.min.js';
import { useDispatch, useSelector } from 'react-redux';

import { setModel } from '../../slices/editor/editorSlice';
import { uploadImage } from '../../slices/blog/blogSlice';

const Editor = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)

  // const { model } = useSelector(state => state.blog)
  const { model } = useSelector(state => state.editor)

  const events = {
    "charCounter.exceeded": function () {
      alert("exceeded character limit!")
    },
    'image.beforeUpload': async function (files) {
      const data = {
        image: files[0],
        type: "contentImage"
      };

      try {
        const imageUrl = await dispatch(uploadImage(data));
        console.log(imageUrl)
        this.image.insert(imageUrl.payload.link, true, null, this.image.get(), null);
        return false; // Stop default upload chain.
      } catch (error) {
        console.error("Image upload failed:", error); // Handle any errors
      }


      // const data = new FormData();
      // data.append('blog_file', files[0]);

      // fetch(`/api/blog/upload_image`, {
      //   method: 'POST',
      //   body: data,
      // })
      //   .then(response => {
      //     // Simulating an error manually
      //     return response.json(); // This will be skipped due to the error
      //   })
      //   .then(data => {
      //     // This won't be executed because of the thrown error
      //     this.image.insert(data.link, true, null, this.image.get(), null);
      //     return false; // Stop default upload chain.
      //   })
      //   .catch(error => {
      //     // This block will catch the manually thrown error
      //     console.error('Error uploading image:', error);
      //   });
    },
    'video.beforeUpload': function (files) {
      const data = new FormData();
      data.append('blog_file', files[0]);

      const email = userInfo.email;
      const blogPostNumber = userInfo._id;

      fetch(`/api/blog/upload_image?email=${encodeURIComponent(email)}&blogPostNumber=${encodeURIComponent(blogPostNumber)}`, {
        method: 'POST',
        body: data,
      })
        .then(response => response.json())
        .then(data => {
          // Insert the video link in the editor
          console.log(data.link)
          const videoIframe = `<iframe width="640" height="360" src="${data.link}" frameborder="0" allowfullscreen></iframe>`;
          this.video.insert(videoIframe, null, null, this.video.get(), null);
          return false; // Stop default upload chain.
        })
        .catch(error => {
          console.error('Error uploading video:', error);
        });

      return false; // Stop default upload chain.
    }
  }

  const config = {
    charCounterCount: true,
    events,
    heightMin: 300,
  }
  return (
    <FroalaEditorComponent

      model={model}
      config={config}
      onModelChange={e => dispatch(setModel(e))}
      tag='textarea'
    />
  )
}

export default Editor