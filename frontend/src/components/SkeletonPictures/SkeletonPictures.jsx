import styles from "@/components/SkeletonPictures/SkeletonPictures.module.css";

export default function SkeletonPictures() {
  const SkeletonPicture = () => <div className={styles.skeletonPicture}></div>;

  return (
    <div className={styles.skeletonPicturesContainer}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SkeletonPicture key={i} />
      ))}
    </div>
  );
}
