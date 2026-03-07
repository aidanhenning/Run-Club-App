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

  const handleAddComment = async (content) => {
    try {
      const response = await fetch(`${API}/post-comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId: id, content }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, data],
        comment_count: String(Number(prev.comment_count) + 1),
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const previousPost = { ...post };

    setPost((prev) => ({
      ...prev,
      comments: prev.comments.filter((c) => c.id !== commentId),
      comment_count: String(Number(prev.comment_count) - 1),
    }));

    try {
      const response = await fetch(`${API}/post-comments/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error();
    } catch (err) {
      setPost(previousPost);
      alert("Could not delete comment.");
    }
  };

  const handleLikeComment = async (commentId) => {
    const comment = post.comments.find((c) => c.id === commentId);
    if (!comment) return;

    const previouslyLiked = comment.is_liked;
    const previousPost = { ...post };

    setPost((prev) => ({
      ...prev,
      comments: prev.comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              is_liked: !previouslyLiked,
              comment_like_count: previouslyLiked
                ? Number(c.comment_like_count) - 1
                : Number(c.comment_like_count) + 1,
            }
          : c,
      ),
    }));

    try {
      const method = previouslyLiked ? "DELETE" : "POST";

      const response = await fetch(`${API}/comment-likes/${commentId}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update like");
      }
    } catch (err) {
      setPost(previousPost);
      alert(err.message);
      console.error("Like error:", err);
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
        <Comments
          comments={post.comments}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
          onLikeComment={handleLikeComment}
        />
      </div>

      <BottomNav />
    </div>
  );
}
