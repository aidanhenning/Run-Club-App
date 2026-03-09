import styles from "@/components/Pages/CreateClub/CreateClubForm/CreateClubForm.module.css";

import { useRef } from "react";
import { useNavigate } from "react-router";
import { CiImageOn } from "react-icons/ci";

export default function CreateClubForm({
  API,
  token,
  formData,
  setFormData,
  isFormValid,
}) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Replace MOCK with actual preview URL
    const previewUrl = URL.createObjectURL(file);
    setFormData({ ...formData, logo: previewUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/clubs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Club Saved!");
        const data = await response.json();
        navigate(`/clubs/${data.id}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Something went wrong connecting to the server.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles.mediaUpload}>
        {formData.logo && (
          <div className={styles.previewContainer}>
            <img
              src={formData.logo}
              alt="Club Preview"
              className={styles.previewImage}
            />
          </div>
        )}

        <div
          className={styles.uploadLabel}
          onClick={() => fileInputRef.current.click()}
        >
          <span className={styles.uploadLogo}>
            <CiImageOn />
          </span>
          <span>{formData.logo ? "Change Photo" : "Upload Photo"}</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelection}
            style={{ display: "none" }}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.row}>
          <label htmlFor="clubName">Club Name</label>
          <input
            id="clubName"
            type="text"
            placeholder="Club Name"
            className={styles.inputField}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            className={styles.textarea}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>
      </section>
      <button
        type="submit"
        disabled={!isFormValid}
        className={`${styles.saveButton} ${isFormValid ? styles.saveButtonActive : ""}`}
      >
        Save Club
      </button>
    </form>
  );
}
