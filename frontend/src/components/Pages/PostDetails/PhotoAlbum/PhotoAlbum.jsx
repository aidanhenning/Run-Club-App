import styles from "@/components/Pages/PostDetails/PhotoAlbum/PhotoAlbum.module.css";
import SkeletonPictures from "@/components/Pages/UserProfile/SkeletonPictures/SkeletonPictures";
import PictureCard from "@/components/Pages/UserProfile/PictureCard/PictureCard";

export default function PhotoAlbum({ pictures, loading }) {
  const maxDisplay = 5;
  const displayPictures = pictures?.slice(0, maxDisplay);
  const remainingCount = pictures?.length - maxDisplay;

  return (
    <section className={styles.pictures}>
      <h3 className={styles.picturesTitle}>
        <span>Photo Album</span>
        <span className={styles.countBadge}>{pictures?.length}</span>
      </h3>
      {loading ? (
        <SkeletonPictures />
      ) : pictures?.length > 0 ? (
        <div className={styles.picturesContainer}>
          {displayPictures.map((picture) => (
            <PictureCard key={picture.id} picture={picture} />
          ))}

          {remainingCount > 0 && (
            <div
              className={styles.morePicturesSquare}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
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
    </section>
  );
}
