import styles from "./PictureGrid.module.css";

export default function PictureGrid({ picture }) {
  return (
    <img
      src={picture.image_url}
      alt="user uploaded image"
      className={styles.picture}
    />
  );
}
