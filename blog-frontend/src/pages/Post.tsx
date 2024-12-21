import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostQuery, useAddCommentMutation } from '../store/postsSlice';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '../styles/Post.module.scss';

interface Comment {
  content: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
}

const randomEmoji = (): string => {
  const emojis = ['😀', '🎉', '✨', '🌟', '🔥', '🌈', '🌸', '💡', '📚', '🎶'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useGetPostQuery(Number(id), {
    skip: !id,
  });
  
  const [addComment] = useAddCommentMutation();
  const [comment, setComment] = useState<string>('');

  if (isLoading) return <div>Loading...</div>;
  if (error || !post) return <div>Error loading post</div>;

  const handleAddComment = async (): Promise<void> => {
    if (comment.trim()) {
      await addComment({
        postId: Number(id),
        content: `${randomEmoji()} ${comment}`,
      });
      setComment('');
    }
  };

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {post.title}
      </motion.h1>

      <motion.p
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {post.content}
      </motion.p>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/posts')}
        className={styles.backButton}
      >
        Back to All Posts
      </Button>

      <div className={styles.commentsSection}>
        <motion.h2
          className={styles.commentsTitle}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Comments
        </motion.h2>

        <motion.ul
          className={styles.commentList}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {post.comments.map((c: Comment, index: number) => (
            <motion.li
              key={index}
              className={styles.commentItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className={styles.commentText}>{c.content}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={styles.commentInputContainer}
        >
          <TextField
            className={styles.commentInput}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            multiline
            rows={3}
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddComment}
            className={styles.addCommentButton}
          >
            Add Comment
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Post;
