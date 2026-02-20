import styles from "./Header.module.css";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { BsFilePost } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";

export default function Header({ title }) {
  const { user } = useAuth();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <button
          className={styles.createButton}
          onClick={() => setIsCreateOpen(!isCreateOpen)}
        >
          +
        </button>
        <h1 className={styles.headerTitle}>{title}</h1>
        <Link to="/profile" className={styles.headerProfileLink}>
          {user?.profile_picture_url ? (
            <img
              src={user.profile_picture_url}
              alt="Me"
              className={styles.profileImg}
            />
          ) : (
            <div className={styles.profileInitial}>
              {user?.first_name.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>
      </header>

      {isCreateOpen && (
        <div className={styles.dropdownMenu}>
          <Link to="/create-post">
            <BsFilePost />
            New Post
          </Link>
          <Link to="/create-club">
            <HiOutlineUserGroup />
            New Club
          </Link>
        </div>
      )}
    </>
  );
}
