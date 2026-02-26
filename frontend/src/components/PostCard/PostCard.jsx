import styles from "./PostCard.module.css";
import { useNavigate } from "react-router";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div
        className={styles.title}
        onClick={() => navigate(`/clubs/${post.club_id}`)}
      >
        <div className={styles.titleProfileImage}>
          {post.club_logo === null
            ? post.club_name.charAt(0).toUpperCase()
            : post.club_logo}
        </div>
        <div className={styles.titleText}>{post.club_name}</div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statsItem}>
          <span className={styles.label}>Distance</span>
          <span className={styles.value}>{post.distance}mi</span>
        </div>
        <div className={styles.statsItem}>
          <span className={styles.label}>Elev</span>
          <span className={styles.value}>{post.elevation}ft</span>
        </div>
        <div className={styles.statsItem}>
          <span className={styles.label}>Type</span>
          <span className={styles.value}>{post.run_type}</span>
        </div>
        <div className={styles.statsItem}>
          <span className={styles.label}>Time</span>
          <span className={styles.value}>{post.estimated_time}</span>
        </div>
      </div>

      <div className={styles.pictures}>
        <div className={styles.mapPlaceholder}>
          <span>Route Map</span>
        </div>
      </div>

      <div className={styles.bibleVerse}>
        <p className={styles.reference}>{post.bible_reference}</p>
        <p className={styles.verseText}>{post.bible_text}</p>
      </div>

      <div className={styles.comments}>View all comments</div>
    </div>
  );
}
