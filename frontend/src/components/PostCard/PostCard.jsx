import styles from "@/components/PostCard/PostCard.module.css";

import { useNavigate } from "react-router";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <article className={styles.card}>
      <div
        className={styles.title}
        onClick={() => navigate(`/clubs/${post.club_id}`)}
      >
        <div>
          {post?.club_logo ? (
            <img
              src={post.club_logo}
              alt={`${post.club_name} logo`}
              className={styles.profileImage}
            />
          ) : (
            <span className={styles.initial}>
              {post?.club_name?.charAt(0).toUpperCase() || "?"}
            </span>
          )}
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
    </article>
  );
}
