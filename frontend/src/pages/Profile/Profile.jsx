import styles from "./Profile.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Profile</h1>
      </header>

      <main className={styles.content}>
        <button onClick={handleSubmit}>Log Out</button>
      </main>

      <BottomNav />
    </div>
  );
}
