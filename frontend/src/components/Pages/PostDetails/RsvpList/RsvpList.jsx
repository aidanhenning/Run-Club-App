import styles from "@/components/Pages/PostDetails/RsvpList/RsvpList.module.css";
import AttendeeModal from "@/components/Pages/PostDetails/RsvpList/AttendeeModal";

import { useState } from "react";
import { useNavigate } from "react-router";

export default function RsvpList({ post, user, onToggleAttendance }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maxDisplay = 5;
  const attendees = post?.attendees || [];
  const displayAttendees = attendees.slice(0, maxDisplay);
  const isUserAttending = attendees.some((a) => a.id === user?.id);

  const isPast = new Date(post.starts_at) < new Date();

  let buttonText = isPast ? "I Was There" : "I'm In";
  if (isUserAttending) {
    buttonText = isPast ? "I Wasn't There" : "Leave Run";
  }

  return (
    <section className={styles.rsvpList}>
      <div className={styles.owner}>
        <div>
          <p className={styles.ownerName}>
            {post?.owner_first_name} {post?.owner_last_name}
          </p>
          <p className={styles.ownerTitle}>Organizer</p>
        </div>

        <div className={styles.ownerIcon}>
          {post?.owner_profile_picture ? (
            <img
              src={post.owner_profile_picture}
              alt={`${post.owner_first_name}'s profile picture`}
              onClick={() => navigate(`/profile/${post.club_owner_id}`)}
              className={styles.profileImg}
            />
          ) : (
            <div
              className={styles.profileInitial}
              onClick={() => navigate(`/profile/${post.club_owner_id}`)}
            >
              {post?.owner_first_name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      <div className={styles.attendees}>
        <button
          className={`${isUserAttending ? styles.joinedBtn : styles.joinBtn}`}
          onClick={onToggleAttendance}
        >
          {buttonText}
        </button>
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
      </div>

      <AttendeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        attendees={post?.attendees || []}
      />
    </section>
  );
}
