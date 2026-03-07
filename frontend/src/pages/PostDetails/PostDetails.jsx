import styles from "@/pages/PostDetails/PostDetails.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import Details from "@/components/Pages/PostDetails/Details/Details";
import RsvpList from "@/components/Pages/PostDetails/RsvpList/RsvpList";
import PhotoAlbum from "@/components/Pages/PostDetails/PhotoAlbum/PhotoAlbum";
import Comments from "@/components/Pages/PostDetails/Comments/Comments";

import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function PostDetails() {
  const { API, token } = useAuth();
  const { id } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);

  console.log(post);

  const fetchPostDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPost(data);
    } catch (err) {
      console.error("Failed to fetch feed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !API) return;
    fetchPostDetails(0, true);
  }, [token, API]);

  return (
    <div className={styles.container}>
      <Header title="" showBack={true} />

      <div className={styles.content}>
        <Details post={post} />
        <RsvpList post={post} />
        <PhotoAlbum pictures={post.pictures} loading={loading} />
        <Comments comments={post.comments} />
      </div>

      <BottomNav />
    </div>
  );
}
