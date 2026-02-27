import styles from "@/pages/CreateClub/CreateClub.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import CreateClubForm from "@/components/Pages/CreateClub/CreateClubForm/CreateClubForm";

import { useState } from "react";

export default function CreateClub() {
  const { API, token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
  });

  const isFormValid = formData.name.trim() !== "";

  return (
    <div className={styles.container}>
      <Header title="Create Club" showBack={true} />

      <div className={styles.info}>
        <h2>Customize your club</h2>
        <p>Choose a club name, add a photo and write a description</p>
      </div>

      <CreateClubForm
        API={API}
        token={token}
        formData={formData}
        setFormData={setFormData}
        isFormValid={isFormValid}
      />
    </div>
  );
}
