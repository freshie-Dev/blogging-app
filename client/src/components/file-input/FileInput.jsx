import React, { useState } from 'react';
import ImageCrop from '../image-crop/ImageCrop';
import { useDispatch, useSelector } from 'react-redux';
import { setTitleImage } from '../../slices/editor/editorSlice';
import { base64ToBlob } from '../../utils/base64ToBlob';
import mime from "mime"
const FileInput = () => {
    const { titleImage } = useSelector(state => state.editor)
    const [fileName, setFileName] = useState("No Title Image selected");
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()

    const handleFileChange = (event) => {

        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            // Read the file as DataURL for image preview and cropping
            const reader = new FileReader();
            reader.onload = (e) => {
                dispatch(setTitleImage(e.target.result))

                // const base64Url = e.target.result
                // const mimeType = mime.getType(file.name)

                // console.log(base64ToBlob(base64Url, mimeType))
                setEditMode(true)
            };
            reader.readAsDataURL(file); // Trigger the file reader
        } else {
            setFileName("No Title Image selected");
            dispatch(setTitleImage(null));
        }
    };

    return (
        <div className=''>
            <div className="w-full h-[40px] flex items-center">
                {/* Custom file input */}
                <label
                    htmlFor="picture"
                    className="flex w-[100px] h-[40px] bg-gray-500 text-white text-sm font-medium items-center justify-center rounded-md cursor-pointer"
                >
                    Browse
                </label>
                <input
                    className="hidden"
                    type="file"
                    id="picture"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {/* Display selected file name */}
                <span className="ml-3 text-gray-600 text-sm">{fileName}</span>
            </div>
            {titleImage && editMode && (
                <div
                    style={{ backdropFilter: "blur(5px)" }} // Correct camelCase usage
                    className='absolute top-0 left-0 flex justify-center items-center z-[999] w-[100vw] h-[100vh] bg-gray-400 bg-opacity-50 backdrop-blur-lg'
                >
                    <ImageCrop img={titleImage} disableEditMode = {()=> setEditMode(false)} />
                </div>
            )}

        </div>
    );
};

export default FileInput;
