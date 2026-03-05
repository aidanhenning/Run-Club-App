import styles from "@/pages/EditProfile/EditProfile.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { CiImageOn } from "react-icons/ci";

export default function EditProfile() {
  const { id } = useParams();
  const { API, token, user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    profilePictureUrl: "",
    location: "",
  });

  useEffect(() => {
    if (user) {
      if (id != user.id) {
        navigate("/home");
        return;
      }

      setFormData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        password: "",
        bio: user.bio || "",
        profilePictureUrl: user.profile_picture_url || "",
        location: user.location || "",
      });
    }
  }, [user, id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // MOCK LOGIC: In a production app, upload 'files' to the cloud here
    // and get a URL back. For now, we'll just pretend:
    const mockUrl = "https://via.placeholder.com/150";
    setFormData((prev) => ({ ...prev, profilePictureUrl: mockUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await refreshUser();
        navigate(`/profile/${user.id}`);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className={styles.container}>
      <Header title="Edit Profile" showBack={true} />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.mediaUpload}>
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
        </div>
        <div className={styles.textFields}>
          <div className={styles.row}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className={styles.inputField}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className={styles.inputField}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="bio" className={styles.label}>
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="bio"
              className={styles.textarea}
            ></textarea>
          </div>
          <div className={styles.row}>
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="location"
              className={styles.inputField}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className={styles.inputField}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className={styles.inputField}
            />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" disabled={loading} className={styles.saveBtn}>
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/profile/${user.id}`)}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
