export const setCanvasPreview = (image, canvas, crop) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('No 2D context');
    }
    
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    const pixelRatio = window.devicePixelRatio || 1;
    
    console.log(crop.width)
    console.log(crop.height)
    console.log(pixelRatio)
    // Adjust the canvas size to match the cropped image's scaled width/height
    canvas.width = crop.width * scaleX * pixelRatio;
    canvas.height = crop.height * scaleY * pixelRatio;

    // Set the transform scale to handle high-DPI screens
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the cropped image
    ctx.drawImage(
        image,
        crop.x * scaleX,      // Source X
        crop.y * scaleY,      // Source Y
        crop.width * scaleX,  // Source width
        crop.height * scaleY, // Source height
        0,                    // Destination X
        0,                    // Destination Y
        canvas.width / pixelRatio,  // Destination width
        canvas.height / pixelRatio  // Destination height
    );
};
