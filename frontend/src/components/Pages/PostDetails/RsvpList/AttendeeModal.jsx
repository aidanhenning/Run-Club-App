import styles from "./AttendeeModal.module.css";
import { useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";

export default function AttendeeModal({ isOpen, onClose, attendees }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h3>Attendees</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <IoClose size={24} />
          </button>
        </header>

        <ul className={styles.list}>
          {attendees.map((person) => (
            <li
              key={person.user_id}
              className={styles.userRow}
              onClick={() => {
                navigate(`/profile/${person.user_id}`);
                onClose();
              }}
            >
              <img
                src={person.profile_picture_url}
                alt={person.first_name}
                className={styles.avatar}
              />
              <span className={styles.userName}>
                {person.first_name} {person.last_name || ""}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
