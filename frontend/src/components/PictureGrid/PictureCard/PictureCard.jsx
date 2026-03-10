import styles from "@/components/PictureGrid/PictureCard/PictureCard.module.css";

import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

export default function PictureCard({ picture }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className={styles.wrapper} onClick={() => setIsExpanded(true)}>
        <img
          src={picture.image_url}
          alt="user uploaded content"
          className={styles.picture}
        />
      </div>

      {isExpanded && (
        <div className={styles.overlay} onClick={() => setIsExpanded(false)}>
          <button
            className={styles.closeBtn}
            onClick={() => setIsExpanded(false)}
          >
            <IoCloseCircle />
          </button>
          <img
            src={picture.image_url}
            alt="Expanded view"
            className={styles.expandedImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
