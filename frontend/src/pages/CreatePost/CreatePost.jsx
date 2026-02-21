import styles from "./CreatePost.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header/Header";

export default function CreatePost() {
  const { API, token } = useAuth();
  const navigate = useNavigate();

  const [ownedClubs, setOwnedClubs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    clubId: "",
    distance: "",
    elevation: "",
    runType: "Run",
    estimatedTime: "",
    address: "",
    bibleReference: "",
    bibleText: "",
    images: [],
  });

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
      <Header title="Create Post" />

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* SECTION 1: MAIN DETAILS */}
        <section>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Title (eg. Morning Run)"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Park or City"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div className={styles.row}>
            <select
              value={formData.clubId}
              onChange={(e) =>
                setFormData({ ...formData, clubId: e.target.value })
              }
            >
              <option value="">Select Club</option>
              {ownedClubs.map((club) => {
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>;
              })}
            </select>
          </div>
          <div className={styles.row}>
            <select
              value={formData.runType}
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

        {/* SECTION 2: PHOTO UPLOAD */}
        <section>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelection}
          />
        </section>

        {/* SECTION 3: STATS */}
        <h3>Stats</h3>
        <section>
          <div className={styles.row}>
            <input
              type="datetime-local"
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
              onChange={(e) =>
                setFormData({ ...formData, estimatedTime: e.target.value })
              }
            />
          </div>
          <div className={styles.row}>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              onChange={(e) =>
                setFormData({ ...formData, distance: e.target.value })
              }
            />
          </div>
          <div className={styles.row}>
            <input
              type="number"
              placeholder="0"
              onChange={(e) =>
                setFormData({ ...formData, elevation: e.target.value })
              }
            />
          </div>
        </section>

        {/* SECTION 4: SCRIPTURE REFERENCE */}
        <h3>Scripture</h3>
        <section>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="bible Reference (eg. John 3:16)"
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

        <button type="submit" className={styles.saveButton}>
          Save Post
        </button>
      </form>
    </div>
  );
}
