import styles from "@/components/Pages/CreateClub/CreateClubForm/CreateClubForm.module.css";

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

  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);
    console.log("Files selected:", files);

    // MOCK LOGIC: In a production app, upload 'files' to the cloud here
    // and get a URL back. For now, we'll just pretend:
    const mockUrl = "https://via.placeholder.com/150";
    setFormData({ ...formData, logo: [mockUrl] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      formData,
    };

    try {
      const response = await fetch(`${API}/clubs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Club Saved!");
        navigate("/clubs");
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
        <label htmlFor="fileUpload" className={styles.uploadLabel}>
          <span className={styles.uploadLogo}>
            <CiImageOn />
          </span>
          <span>Upload Photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelection}
            className={styles.hiddenInput}
          />
        </label>
      </section>

      <section className={styles.section}>
        <div className={styles.row}>
          <label htmlFor="clubName">Club Name</label>
          <input
            id="clubName"
            type="text"
            placeholder="Club Name"
            className={styles.mainInput}
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
