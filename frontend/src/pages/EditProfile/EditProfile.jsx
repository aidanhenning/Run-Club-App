import styles from "@/pages/EditProfile/EditProfile.module.css";
import { useAuth } from "@/context/AuthContext";
import { uploadImage } from "@/utils/uploadImage";
import Header from "@/components/Header/Header";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { CiImageOn } from "react-icons/ci";

export default function EditProfile() {
  const { id } = useParams();
  const { API, token, user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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
  const [selectedFile, setSelectedFile] = useState(null);

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
    setSelectedFile(file);
    setFormData((prev) => ({
      ...prev,
      profilePictureUrl: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let picUrl = formData.profilePictureUrl;

    if (selectedFile) {
      const uploaded = await uploadImage(selectedFile);
      if (uploaded) picUrl = uploaded;
    }

    try {
      const res = await fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, profilePictureUrl: picUrl }),
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
          {formData.profilePictureUrl && (
            <div className={styles.profilePreviewWrapper}>
              <img
                src={formData.profilePictureUrl}
                alt="Profile Preview"
                className={styles.profilePreviewImage}
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
            <span>Change Profile Picture</span>
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
