import styles from "@/components/Pages/Home/PostCard/PostCard.module.css";
import { useAuth } from "@/context/AuthContext";

import { useState } from "react";
import { useNavigate } from "react-router";
import { MdFlag } from "react-icons/md";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";

export default function PostCard({ post }) {
  const { API, token } = useAuth();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(post.id_liked);
  const [likeCount, setLikeCount] = useState(Number(post.like_count));

  console.log(post);

  const formatPostDate = (dateString) => {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart} at ${timePart}`;
  };

  const handleLikeToggle = async () => {
    const previouslyLiked = isLiked;
    const previousCount = likeCount;

    setIsLiked(!previouslyLiked);
    setLikeCount((prev) => (previouslyLiked ? prev - 1 : prev + 1));

    try {
      const method = previouslyLiked ? "DELETE" : "POST";
      const response = await fetch(`${API}/post-likes/${post.id}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update like");
      }
    } catch (err) {
      console.error(err);
      setIsLiked(previouslyLiked);
      setLikeCount(previousCount);
    }
  };

  return (
    <article className={styles.card}>
      <section
        className={styles.heading}
        onClick={() => navigate(`/clubs/${post.club_id}`)}
      >
        <div>
          {post?.club_logo ? (
            <img
              src={post.club_logo}
              alt={`${post.club_name} logo`}
              className={styles.clubLogo}
            />
          ) : (
            <MdFlag className={styles.placeholder} />
          )}
        </div>
        <div className={styles.headingText}>
          <span className={styles.clubName}>{post.club_name}</span>
          <span className={styles.startingTime}>
            {formatPostDate(post.starts_at)}
          </span>
          <span className={styles.address}>{post.address}</span>
        </div>
      </section>

      <section>
        <h2 className={styles.title}>{post.title}</h2>
      </section>

      <section className={styles.stats}>
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
      </section>

      <div className={styles.pictures}>
        <div className={styles.mapPlaceholder}>
          <span>Route Map</span>
        </div>
      </div>

      <div className={styles.postInteraction}>
        <div className={styles.likes}>
          <button onClick={handleLikeToggle} className={styles.likeBtn}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <span>{likeCount}</span>
        </div>
        <div className={styles.comments}>
          <span className={styles.commentBtn}>
            <FaRegComment />
          </span>
          <span>{post.comment_count}</span>
        </div>
      </div>

      <div className={styles.bibleVerse}>
        <p className={styles.reference}>{post.bible_reference}</p>
        <p className={styles.verseText}>{post.bible_text}</p>
      </div>
    </article>
  );
}
