import React from 'react';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView.js';
import { useSelector } from 'react-redux';

const EditorView = () => {
    const { model, titleImage, title } = useSelector(state => state.editor);
   
    return (
        <>
           
            {titleImage ? (
                <div
                    className='flex justify-center items-center rounded-md'
                    style={{
                        width: '100%',
                        // height: '400px',
                        paddingBottom: '57.14%', // 7:4 aspect ratio
                        position: "relative",
                        backgroundImage: `url(${titleImage})`,
                        backgroundSize:"cover", // Makes the image cover the entire div
                        backgroundPosition: 'center', // Centers the image
                        backgroundRepeat: 'no-repeat' // Prevents the image from repeating
                    }}
                >
                    <h1
                        className='image-title font-bold absolute top-[50%] translate-y-[-50%] text-white '
                        style={{
                            textShadow: '3px 3px #000000',
                            textAlign: 'center',
                            fontFamily: "'Montserrat', sans-serif"
                        }}
                    >
                        {title}
                    </h1>
                </div>
            ) : (
                <h1 className='image-title text-center font-bold'>{title}</h1>
            )}
            <FroalaEditorView model={model} />
        </>
    );
};

export default EditorView;
