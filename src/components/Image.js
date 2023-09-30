import React, { useState } from 'react';

const ImageUploader = () => {
  const [uploadedImage, setUploadedImage] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const imageData = reader.result;
        setUploadedImage(imageData);
        localStorage.setItem('uploadedImage', imageData);
      };
    }
  };

  const handleImageClear = () => {
    setUploadedImage('');
    localStorage.removeItem('uploadedImage');
  };

  // Retrieve the uploaded image from local storage on component mount
  React.useEffect(() => {
    const imageData = localStorage.getItem('uploadedImage');
    if (imageData) {
      setUploadedImage(imageData);
    }
  }, []);

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {uploadedImage && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={uploadedImage} alt="Uploaded" />
          <button onClick={handleImageClear}>Clear Image</button>
        </div>
      )}

      {!uploadedImage && <p>No image uploaded.</p>}
      <style jsx>{`
        .upload-container {
          border: 2px dashed #ccc;
          padding: 1rem;
          text-align: center;
        }

        .upload-label {
          display: block;
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default ImageUploader;
