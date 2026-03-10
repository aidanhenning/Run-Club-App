import styles from "@/components/Pages/CreatePost/CreatePostForm/CreatePostForm.module.css";
import { uploadImage } from "@/utils/uploadImage";

import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { CiImageOn } from "react-icons/ci";

export default function CreatePostForm({
  API,
  token,
  ownedClubs,
  formData,
  setFormData,
  isFormValid,
}) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [imageFiles, setImageFiles] = useState([]);

  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    const previews = files.map((f) => URL.createObjectURL(f));
    setFormData({ ...formData, images: [...formData.images, ...previews] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedUrls = await Promise.all(
      imageFiles.map((file) => uploadImage(file)),
    );
    const validUrls = uploadedUrls.filter((url) => url !== null);

    const payload = {
      ...formData,
      images: validUrls,
      distance: parseFloat(formData.distance) || 0,
      elevation: parseFloat(formData.elevation) || 0,
    };

    try {
      const response = await fetch(`${API}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Activity Saved!");
        navigate("/home");
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
      <section className={styles.section}>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Title"
            className={styles.inputField}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className={styles.row}>
          <select
            value={formData.clubId}
            className={styles.selectField}
            onChange={(e) =>
              setFormData({ ...formData, clubId: e.target.value })
            }
          >
            <option value="">Select a Club</option>
            {ownedClubs.map((club) => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.row}>
          <select
            value={formData.runType}
            className={styles.selectField}
            onChange={(e) =>
              setFormData({ ...formData, runType: e.target.value })
            }
          >
            <option value="Easy Run">Easy Run</option>
            <option value="Long Run">Long Run</option>
            <option value="Tempo">Tempo</option>
            <option value="Intervals">Intervals</option>
            <option value="Race">Race</option>
          </select>
        </div>
      </section>

      <section className={styles.mediaUpload}>
        <div
          className={styles.uploadLabel}
          onClick={() => fileInputRef.current.click()}
        >
          <span className={styles.uploadLogo}>
            <CiImageOn />
          </span>
          <span>Add Photos</span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelection}
            style={{ display: "none" }}
          />
        </div>

        {formData.images?.length > 0 && (
          <div className={styles.previewGrid}>
            {formData.images.map((url, idx) => (
              <img
                key={idx}
                src={url}
                className={styles.previewImage}
                alt="Preview"
              />
            ))}
          </div>
        )}
      </section>

      <h3 className={styles.sectionTitle}>Activity Stats</h3>
      <section className={styles.section}>
        <div className={styles.row}>
          <input
            type="datetime-local"
            className={styles.inputField}
            onChange={(e) =>
              setFormData({ ...formData, startsAt: e.target.value })
            }
          />
        </div>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Duration (HH:MM:SS)"
            className={styles.inputField}
            value={formData.estimatedTime || ""}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9:]/g, "");
              setFormData({ ...formData, estimatedTime: value });
            }}
          />
        </div>
        <div className={styles.row}>
          <input
            type="number"
            step="0.01"
            placeholder="0.00 mi"
            className={styles.inputField}
            onChange={(e) =>
              setFormData({ ...formData, distance: e.target.value })
            }
          />
        </div>
        <div className={styles.row}>
          <input
            type="number"
            placeholder="0 ft"
            className={styles.inputField}
            onChange={(e) =>
              setFormData({ ...formData, elevation: e.target.value })
            }
          />
        </div>
      </section>

      <h3 className={styles.sectionTitle}>Details</h3>
      <section className={styles.section}>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Location"
            className={styles.inputField}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
      </section>

      <h3 className={styles.sectionTitle}>Scripture</h3>
      <section className={styles.section}>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Bible Reference (eg. John 3:16)"
            className={styles.inputField}
            onChange={(e) =>
              setFormData({ ...formData, bibleReference: e.target.value })
            }
          />
        </div>
        <textarea
          placeholder="Bible Text"
          className={styles.textarea}
          onChange={(e) =>
            setFormData({ ...formData, bibleText: e.target.value })
          }
        ></textarea>
      </section>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`${styles.saveButton} ${isFormValid ? styles.saveButtonActive : ""}`}
      >
        Save Post
      </button>
    </form>
  );
}
