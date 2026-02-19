import React from "react";
import styles from "./Profile.module.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

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
      <button onClick={handleSubmit}>Log Out</button>
      <BottomNav />
    </div>
  );
}
