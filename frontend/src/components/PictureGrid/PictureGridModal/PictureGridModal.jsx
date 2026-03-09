import styles from "@/components/PictureGrid/PictureGridModal/PictureGridModal.module.css";
import PictureCard from "@/components/Pages/UserProfile/PictureCard/PictureCard";
import { IoClose } from "react-icons/io5";

export default function PictureGridModal({ isOpen, onClose, pictures, title }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h3>{title || "Photos"}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <IoClose />
          </button>
        </header>

        <div className={styles.grid}>
          {pictures.map((pic) => (
            <div key={pic.id} className={styles.gridItem}>
              <PictureCard picture={pic} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
