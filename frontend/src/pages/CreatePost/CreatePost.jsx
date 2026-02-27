import styles from "@/pages/CreatePost/CreatePost.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import CreatePostForm from "@/components/Pages/CreatePost/CreatePostForm/CreatePostForm";

import { useState, useEffect } from "react";

export default function CreatePost() {
  const { API, token } = useAuth();

  const [ownedClubs, setOwnedClubs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    clubId: "",
    runType: "Run",
    images: [],
    startsAt: "",
    estimatedTime: "",
    distance: "",
    elevation: "",
    address: "",
    bibleReference: "",
    bibleText: "",
  });

  const isFormValid =
    formData.title.trim() !== "" &&
    formData.clubId !== "" &&
    formData.distance !== "" &&
    formData.estimatedTime !== "";

  useEffect(() => {
    async function fetchClubs() {
      try {
        const res = await fetch(`${API}/clubs/owned`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setOwnedClubs(data);
      } catch (err) {
        console.error("Error fetching clubs", err);
      }
    }
    fetchClubs();
  }, [API, token]);

  return (
    <div className={styles.container}>
      <Header title="Create Post" showBack={true} />

      <CreatePostForm
        API={API}
        token={token}
        ownedClubs={ownedClubs}
        formData={formData}
        setFormData={setFormData}
        isFormValid={isFormValid}
      />
    </div>
  );
}
