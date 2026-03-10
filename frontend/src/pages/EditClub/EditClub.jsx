import styles from "@/pages/EditClub/EditClub.module.css";
import { useAuth } from "@/context/AuthContext";
import { uploadImage } from "@/utils/uploadImage";
import Header from "@/components/Header/Header";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { CiImageOn } from "react-icons/ci";

export default function EditClub() {
  const { id } = useParams();
  const { API, token, user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await fetch(`${API}/clubs/${id}/basic`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const clubData = await res.json();

          if (user && clubData.owner != user.id) {
            navigate("/home");
            return;
          }

          setFormData({
            name: clubData.name || "",
            description: clubData.description || "",
            logo: clubData.logo || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch club", err);
        setError(err.message);
      }
    };

    if (user) fetchClub();
  }, [id, user, API, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setFormData((prev) => ({ ...prev, logo: URL.createObjectURL(file) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let logoUrl = formData.logo;

    if (selectedFile) {
      const uploaded = await uploadImage(selectedFile);
      if (uploaded) logoUrl = uploaded;
    }

    try {
      const res = await fetch(`${API}/clubs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, logo: logoUrl }),
      });

      if (res.ok) {
        navigate(`/clubs/${id}`);
      } else {
        const data = await res.json();
        setError(data.error || "Update failed");
      }
    } catch (err) {
      console.error("Update failed:", err);
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header title="Edit Club" showBack={true} />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.mediaUpload}>
          {formData.logo && (
            <div className={styles.imagePreviewWrapper}>
              <img
                src={formData.logo}
                alt="Club Logo Preview"
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
              className={styles.hiddenInput}
            />
          </div>
        </div>

        <div className={styles.textFields}>
          <div className={styles.row}>
            <label htmlFor="clubName" className={styles.label}>
              Club Name
            </label>
            <input
              id="clubName"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="description"
              className={styles.textarea}
            ></textarea>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" disabled={loading} className={styles.saveBtn}>
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
