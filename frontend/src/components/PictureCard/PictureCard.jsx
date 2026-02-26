import styles from "@/components/PictureCard/PictureCard.module.css";

export default function PictureCard({ picture }) {
  return (
    <img
      src={picture.image_url}
      alt="user uploaded image"
      className={styles.picture}
    />
  );
}
