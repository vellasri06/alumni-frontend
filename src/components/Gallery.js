import React, { useState, useEffect } from "react";
import "./Gallery.css"; // ✅ Add this CSS file

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  //const [descriptions, setDescriptions] = useState({}); // Store descriptions

  // ✅ Fetch uploaded images from the backend
  useEffect(() => {
    fetch("http://localhost:5001/api/gallery/uploads") // Correct API endpoint
      .then((res) => res.json())
      .then((data) => {
        const updatedImages = data.map((image) => ({
          url: `http://localhost:5001${image.imageUrl}`,
          description: image.description || "",
        }));
        setImages(updatedImages);
      })
      .catch((error) => console.error("❌ Error fetching images:", error));
  }, []);

  // ✅ Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5001/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Upload successful:", data);

      // ✅ Update state to show new image
      setImages([...images, { url: `http://localhost:5001${data.imageUrl}`, description: "" }]);
    } catch (error) {
      console.error("❌ Upload error:", error);
      setUploadError(error.message);
    }
  };

  // ✅ Handle description change
  const handleDescriptionChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index].description = value;
    setImages(updatedImages);
  };

  return (
    <div className="gallery-container">
      <h2>📸 Image Gallery</h2>

      {/* Image Grid */}
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image.url} alt="Uploaded" className="gallery-img" />
            <input
              type="text"
              className="description-input"
              placeholder="Add description..."
              value={image.description}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* File Input & Upload Button */}
      <div className="upload-section">
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} accept="image/*" />
        <button className="upload-btn" onClick={handleUpload}>Upload Image</button>
      </div>

      {/* Show Error Message */}
      {uploadError && <p className="error-message">❌ Upload Error: {uploadError}</p>}
    </div>
  );
};

export default Gallery;
