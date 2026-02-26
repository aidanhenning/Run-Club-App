import styles from "@/pages/CreatePost/CreatePost.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CiImageOn } from "react-icons/ci";

export default function CreatePost() {
  const { API, token } = useAuth();
  const navigate = useNavigate();

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

  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);
    console.log("Files selected:", files);

    // MOCK LOGIC: In a production app, upload 'files' to the cloud here
    // and get a URL back. For now, we'll just pretend:
    const mockUrl = "https://via.placeholder.com/150";
    setFormData({ ...formData, images: [...formData.images, mockUrl] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      distance: parseFloat(formData.distance) || 0,
      elevation: parseFloat(formData.elevation) || 0,
      startsAt: formData.startsAt || new Date().toISOString(),
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
        navigate("/");
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
    <div className={styles.container}>
      <Header title="Create Post" showBack={true} />

      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.section}>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Title"
              className={styles.mainInput}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className={styles.row}>
            <select
              value={formData.clubId}
              className={styles.mainSelect}
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
              className={styles.mainSelect}
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
          <label htmlFor="fileUpload" className={styles.uploadLabel}>
            <span className={styles.uploadLogo}>
              <CiImageOn />
            </span>
            <span>Add Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelection}
              className={styles.hiddenInput}
            />
          </label>
        </section>

        <h3>Activity Stats</h3>
        <section className={styles.section}>
          <div className={styles.row}>
            <input
              type="datetime-local"
              className={styles.mainInput}
              onChange={(e) =>
                setFormData({ ...formData, startsAt: e.target.value })
              }
            />
          </div>
          <div className={styles.row}>
            <input
              type="time"
              step="1"
              placeholder="00:00:00"
              className={styles.mainInput}
              onChange={(e) =>
                setFormData({ ...formData, estimatedTime: e.target.value })
              }
            />
          </div>
          <div className={styles.row}>
            <input
              type="number"
              step="0.01"
              placeholder="0.00 mi"
              className={styles.mainInput}
              onChange={(e) =>
                setFormData({ ...formData, distance: e.target.value })
              }
            />
          </div>
          <div className={styles.row}>
            <input
              type="number"
              placeholder="0 ft"
              className={styles.mainInput}
              onChange={(e) =>
                setFormData({ ...formData, elevation: e.target.value })
              }
            />
          </div>
        </section>

        <h3>Details</h3>
        <section className={styles.section}>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Location"
              className={styles.mainInput}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
        </section>

        <h3>Scripture</h3>
        <section className={styles.section}>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Bible Reference (eg. John 3:16)"
              className={styles.mainInput}
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
    </div>
  );
}
