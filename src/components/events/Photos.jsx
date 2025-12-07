import React, { useState, useEffect, useCallback } from "react";
import { usePhotos } from "../../hooks/usePhotos";

export default function Photos({ eventId }) {
  const {
    loading,
    photos,
    error,
    resetError,
    fetchPhotos,
    addPhotos,
    removePhoto,
    sendPhotosToRsvpGuests,
  } = usePhotos();

  const [photoFiles, setPhotoFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  // Fetch photos on mount
  useEffect(() => {
    if (eventId) fetchPhotos(eventId);
  }, [eventId, fetchPhotos]);

  const handleFileChange = (e) => {
    setPhotoFiles(Array.from(e.target.files));
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      setPhotoFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleUpload = async () => {
    if (!photoFiles.length) return;
    await addPhotos(eventId, photoFiles);
    setPhotoFiles([]);
    document.getElementById("photo-upload").value = "";
  };

  const handleDelete = async (photoId) => {
    if (confirm("Delete this photo?")) {
      await removePhoto(photoId);
    }
  };

  const handleSendPhotos = async () => {
    if (confirm(`Send all ${photos.length} photos to RSVP'd guests?`)) {
      await sendPhotosToRsvpGuests(eventId);
      alert("Photos sent successfully!");
    }
  };

  const totalSize = photoFiles.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="w-full px-3 sm:px-4 lg:px-0 space-y-6">

      {/* TITLE */}
      <h3 className="text-2xl sm:text-3xl font-bold text-brown">📸 Event Photos</h3>

      {/* ERROR */}
      {error && (
        <div
          className="text-red-600 mb-4 px-4 py-2 bg-offwhite rounded-lg cursor-pointer 
                     hover:bg-gold/20 transition text-sm sm:text-base"
          onClick={resetError}
        >
          {error}
        </div>
      )}

      {/* UPLOAD + SEND BUTTON (MATCHING InviteManager style) */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-end">

        {/* Upload box */}
        <div className="flex-1 w-full">
          <label className="font-semibold text-lg text-brown block mb-3">
            Add Photos (Max 10, 5MB each)
          </label>

          <div
            className={`
              border-2 border-dashed rounded-lg 
              p-5 sm:p-8 
              text-center transition 
              cursor-pointer
              ${dragActive
                ? "border-gold bg-gold/10 shadow-lg"
                : "border-taupe/50 hover:border-gold hover:bg-gold/5"}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              id="photo-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />

            <label htmlFor="photo-upload" className="cursor-pointer block">
              <p className="text-xl sm:text-2xl font-bold text-brown mb-2">
                {dragActive ? "👆 Drop photos here!" : "📁 Click or Drag & Drop"}
              </p>
              <p className="text-taupe text-sm">You can upload up to 10 images</p>

              {photoFiles.length > 0 && (
                <p className="text-gold font-bold mt-2">
                  {photoFiles.length} file(s) • {(totalSize / 1024 / 1024).toFixed(1)}MB
                </p>
              )}
            </label>
          </div>
        </div>

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={loading || !photoFiles.length}
          className="
            bg-gold text-brown 
            px-6 sm:px-8 py-3 
            rounded-lg font-bold 
            hover:bg-brown hover:text-offwhite 
            transition 
            text-sm sm:text-lg 
            w-full sm:w-auto
          "
        >
          {loading ? "Uploading..." : `Upload (${photoFiles.length})`}
        </button>
      </div>

      {/* SEND ALL PHOTOS BUTTON */}
      {photos.length > 0 && (
        <button
          onClick={handleSendPhotos}
          disabled={loading}
          className="
            bg-gold text-brown 
            px-6 sm:px-8 py-3 
            rounded-lg font-bold 
            hover:bg-brown hover:text-offwhite 
            transition 
            w-full sm:w-auto 
            text-sm sm:text-lg
          "
        >
          Send to RSVP Guests ({photos.length})
        </button>
      )}

      {/* PHOTO GRID */}
      {loading && !photos.length ? (
        <div className="text-center py-12 bg-offwhite rounded-lg text-taupe">
          Loading photos...
        </div>
      ) : photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {photos.map((photo) => (
            <div
              key={photo._id}
              className="
                group bg-offwhite rounded-lg overflow-hidden shadow-md 
                hover:shadow-xl transition-all hover:-translate-y-1
              "
            >
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/photos/${photo.filename}`}
                  alt={photo.originalName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />

                <button
                  onClick={() => handleDelete(photo._id)}
                  className="
                    absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full 
                    opacity-0 group-hover:opacity-100 transition
                  "
                >
                  ✕
                </button>
              </div>

              <div className="p-3 sm:p-4">
                <p className="text-brown text-sm font-medium truncate">
                  {photo.originalName}
                </p>

                <div className="flex justify-between text-xs text-taupe mt-2">
                  <span>{new Date(photo.createdAt).toLocaleDateString()}</span>
                  <span>{(photo.size / 1024).toFixed(1)} KB</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      ) : (
        <div className="text-center py-12 bg-offwhite rounded-xl text-taupe border-dashed border-taupe/40 border-2">
          <p className="text-xl font-bold mb-1">No photos yet</p>
          <p className="text-sm">Upload your first event photo above!</p>
        </div>
      )}
    </div>
  );
}
