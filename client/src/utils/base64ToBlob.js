export const base64ToBlob = (base64String, mimeType = 'image/png') => {
    
    const decodedBase64String = base64String.split(',')[1];
    
    const byteCharacters = atob(decodedBase64String);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const blobImage = new Blob([byteNumbers], { type:mimeType });
    return blobImage
}