import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { setTitleImage } from '../../slices/editor/editorSlice';
import { useDispatch, useSelector } from 'react-redux';
import BasicButton from '../button/button';
import { setCanvasPreview } from '../../utils/setCanvasPreview';
import { GiCancel } from "react-icons/gi";
import { uploadImage } from '../../slices/blog/blogSlice';

const MIN_DIMENSION = 100;
const ASPECT_RATIO = 2 / 1.3;

const ImageCrop = ({ img, disableEditMode }) => {
    const dispatch = useDispatch();

    const { titleImage } = useSelector(state => state.editor)

    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState(null);

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const crop = makeAspectCrop(
            {
                unit: '%',
                width: MIN_DIMENSION,
            },
            ASPECT_RATIO,
            width,
            height
        );
        setCrop(crop);
    };

    const handleCropComplete = (crop) => {
        setCompletedCrop(crop);
    };

    return (
        <>
            <div className='flex flex-col gap-2'>
                <span onClick={disableEditMode} className='absolute top-10 right-10 hover:text-red-500 duration-300 hover:scale-110'><GiCancel size={30}/></span>
                <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={handleCropComplete} // Capture the final crop state
                >
                    <img ref={imgRef} className='h-[70vh] object-cover' src={img} onLoad={onImageLoad} />
                </ReactCrop>
                <BasicButton
                    onClick={async () => {
                        if (completedCrop && imgRef.current && previewCanvasRef.current) {
                            setCanvasPreview(
                                imgRef.current,
                                previewCanvasRef.current,
                                convertToPixelCrop(
                                    completedCrop, // Use completedCrop instead of crop
                                    imgRef.current.naturalWidth,
                                    imgRef.current.naturalHeight
                                )
                            );
                            const dataUrl = previewCanvasRef.current.toDataURL();
                            const data = {
                                base64String: dataUrl,
                                type: "titleImage"
                            }
                            const imageUrl = await dispatch(uploadImage(data));
                            dispatch(setTitleImage(imageUrl.payload.link))
                           
                            disableEditMode();
                        }
                    }}
                    text="Save Cropped Image"
                />
                <BasicButton
                    text="Continue without cropping"
                    onClick={async ()=> {
                        const data = {
                            base64String: titleImage,
                            type: "titleImage"
                        }
                        const imageUrl = await dispatch(uploadImage(data));
                        dispatch(setTitleImage(imageUrl.payload.link))
                        disableEditMode();
                    }}
                />
            </div>

            {completedCrop && (
                <canvas ref={previewCanvasRef} className='max-w-[200px] max-h-[200px] hidden' style={{ objectFit: "contain" }} />
            )}
        </>
    );
};

export default ImageCrop;
