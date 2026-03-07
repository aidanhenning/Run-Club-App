import styles from "@/components/Pages/PostDetails/Comments/Comments.module.css";

import { useState } from "react";
import { useNavigate } from "react-router";
import { FaEllipsisH, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function Comments({
  comments,
  onAddComment,
  onDeleteComment,
  onLikeComment,
}) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <section className={styles.commentsSection}>
      <h3 className={styles.commentsTitle}>
        <span>Comments</span>
        <span className={styles.countBadge}>{comments?.length}</span>
      </h3>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className={styles.commentInput}
        />
        <button
          type="submit"
          className={styles.sendBtn}
          disabled={!newComment.trim()}
        >
          <IoSend size={20} />
        </button>
      </form>
      <div>
        {comments?.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={() => onDeleteComment(comment.id)}
            onLike={() => onLikeComment(comment.id)}
          />
        ))}
      </div>
    </section>
  );
}

function CommentItem({ comment, onDelete, onLike }) {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const formatCommentDate = (dateString) => {
    const diffInDays = Math.floor(
      (new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24),
    );
    return diffInDays < 1 ? "today" : `${diffInDays}d`;
  };

  return (
    <div className={styles.commentItem}>
      {comment?.profile_picture_url ? (
        <img
          src={comment.profile_picture_url}
          alt={`${comment.first_name}'s profile picture`}
          onClick={() => navigate(`/profile/${comment.user_id}`)}
          className={styles.profileImg}
        />
      ) : (
        <div
          className={styles.profileInitial}
          onClick={() => navigate(`/profile/${comment.user_id}`)}
        >
          {user?.first_name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.userName}>
            {comment.first_name} {comment.last_name}
          </span>
          <span className={styles.date}>
            {formatCommentDate(comment.created_at)}
          </span>

          {comment.is_my_comment && (
            <div className={styles.menuContainer}>
              <button
                className={styles.menuBtn}
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaEllipsisH />
              </button>
              {showMenu && (
                <div
                  className={styles.dropdown}
                  onMouseLeave={() => setShowMenu(false)}
                >
                  <button onClick={onDelete} className={styles.deleteBtn}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className={styles.content}>{comment.content}</p>

        <button className={styles.likeBtn} onClick={onLike}>
          {comment.is_liked ? <FaHeart /> : <FaRegHeart />}
          <span>{comment.comment_like_count}</span>
        </button>
      </div>
    </div>
  );
}
