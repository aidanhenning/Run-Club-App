import styles from "@/components/Pages/PostDetails/PhotoAlbum/PhotoAlbum.module.css";
import { useAuth } from "@/context/AuthContext";
import PictureGridModal from "@/components/PictureGrid/PictureGridModal/PictureGridModal";
import PictureCard from "@/components/PictureGrid/PictureCard/PictureCard";

import { useState, useRef } from "react";
import { useParams } from "react-router";
import { MdAddPhotoAlternate } from "react-icons/md";

export default function PhotoAlbum({ pictures, loading, setPost }) {
  const { id: postId } = useParams();
  const { API, token } = useAuth();

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const maxDisplay = 5;
  const displayPictures = pictures?.slice(0, maxDisplay);
  const remainingCount = pictures?.length - maxDisplay;

  const handleOpenGallery = (e) => {
    e.stopPropagation();
    setIsGalleryOpen(true);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of files) {
        // 1. MOCK UPLOAD LOGIC
        // In a real app, you'd upload the 'file' to Cloudinary/S3 here
        // const imageUrl = await uploadToCloudinary(file);
        const imageUrl = URL.createObjectURL(file);

        const response = await fetch(`${API}/post-pictures`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ postId, imageUrl }),
        });

        if (response.ok) {
          const newPicture = await response.json();
          setPost((prev) => ({
            ...prev,
            pictures: [newPicture, ...prev.pictures],
          }));
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("One or more uploads failed.");
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  return (
    <section className={styles.pictures}>
      <h3 className={styles.picturesTitle}>
        <span>Photo Album</span>
        <span className={styles.countBadge}>{pictures?.length}</span>
      </h3>
      {pictures?.length > 0 ? (
        <div className={styles.picturesContainer}>
          {displayPictures.map((picture) => (
            <PictureCard key={picture.id} picture={picture} />
          ))}

          {remainingCount > 0 && (
            <div
              className={styles.morePicturesSquare}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenGallery();
              }}
            >
              <span>+{remainingCount}</span>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No photos uploaded</p>
        </div>
      )}

      <PictureGridModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        pictures={pictures}
      />

      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <button
        onClick={handleButtonClick}
        className={styles.addImages}
        disabled={isUploading}
      >
        <MdAddPhotoAlternate className={styles.icon} />
        <span>{isUploading ? "Uploading..." : "Add Photos"}</span>
      </button>
    </section>
  );
}
