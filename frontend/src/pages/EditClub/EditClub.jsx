import styles from "@/pages/EditClub/EditClub.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { CiImageOn } from "react-icons/ci";

export default function EditClub() {
  const { id } = useParams();
  const { API, token, user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
  });

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
    const files = Array.from(e.target.files);
    console.log("Files selected:", files);

    // MOCK LOGIC: In a production app, upload 'files' to the cloud here
    // and get a URL back. For now, we'll just pretend:
    const mockUrl = "https://via.placeholder.com/150";
    setFormData({ ...formData, logo: mockUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API}/clubs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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
          <label htmlFor="fileUpload" className={styles.uploadLabel}>
            <span className={styles.uploadLogo}>
              <CiImageOn />
            </span>
            <span>Upload Photo</span>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleFileSelection}
              className={styles.hiddenInput}
            />
          </label>
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
