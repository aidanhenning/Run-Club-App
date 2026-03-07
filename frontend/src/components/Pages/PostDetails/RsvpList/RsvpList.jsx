import styles from "@/components/Pages/PostDetails/RsvpList/RsvpList.module.css";
import AttendeeModal from "@/components/Pages/PostDetails/RsvpList/AttendeeModal";

import { useState } from "react";
import { useNavigate } from "react-router";

export default function RsvpList({ post }) {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const maxDisplay = 5;
  const attendees = post?.attendees || [];
  const displayAttendees = attendees.slice(0, maxDisplay);

  return (
    <section className={styles.rsvpList}>
      <h3 className={styles.attendeesTitle}>
        {new Date(post.starts_at) < new Date() ? "Attended" : "Members Going"}
        <span className={styles.countBadge}>{attendees.length}</span>
      </h3>

      <div className={styles.peopleIcons}>
        {displayAttendees.map((person) =>
          person?.profile_picture_url ? (
            <img
              key={person.user_id}
              src={person.profile_picture_url}
              alt={`${person.first_name}'s profile picture`}
              onClick={() => navigate(`/profile/${person.user_id}`)}
              className={styles.profileImg}
            />
          ) : (
            <div
              className={styles.profileInitial}
              onClick={() => navigate(`/profile/${person.user_id}`)}
            >
              {user?.first_name.charAt(0).toUpperCase()}
            </div>
          ),
        )}
        {post?.attendees?.length > 5 && (
          <div
            className={styles.moreCircle}
            onClick={() => setIsModalOpen(true)}
          >
            +{post.attendees.length - 5}
          </div>
        )}
      </div>

      <AttendeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        attendees={post?.attendees || []}
      />
    </section>
  );
}
