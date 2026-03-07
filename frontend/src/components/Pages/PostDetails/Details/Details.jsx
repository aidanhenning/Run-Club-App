import styles from "@/components/Pages/PostDetails/Details/Details.module.css";

import { useNavigate } from "react-router";
import { MdFlag, MdLocationOn } from "react-icons/md";
import { FaCrown } from "react-icons/fa";

export default function Details({ post }) {
  const navigate = useNavigate();

  const formatPostDateDay = (dateString) => {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    return datePart;
  };

  const formatPostDateTime = (dateString) => {
    const date = new Date(dateString);

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return timePart;
  };

  return (
    <section className={styles.details}>
      <div>
        <h2 className={styles.title}>{post.title}</h2>
      </div>
      {post?.club_logo ? (
        <img
          src={post.club_logo}
          alt={`${post.club_name} logo`}
          className={styles.clubLogo}
        />
      ) : (
        <MdFlag className={styles.placeholder} />
      )}
      <div className={styles.date}>
        <span className={styles.day}>{formatPostDateDay(post.starts_at)}</span>
        <span className={styles.time}>
          {formatPostDateTime(post.starts_at)}
        </span>
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
      <div>
        <p className={styles.location}>
          <span className={styles.icon}>
            <MdLocationOn />
          </span>
          <span>{post.address}</span>
        </p>
      </div>
      <div className={styles.host}>
        <h3 className={styles.hostTitle}>
          <span className={styles.icon}>
            <FaCrown />
          </span>
          <span>Hosted by</span>
        </h3>
        <img
          src={post.owner_profile_picture}
          alt={`${post.owner_first_name} ${post.owner_last_name}'s profile picture`}
          onClick={() => navigate(`/profile/${post.club_owner_id}`)}
          className={styles.profilePicture}
        />
      </div>
    </section>
  );
}
