import React, { useState } from 'react';
import { useCreatePostMutation } from '../store/postsSlice';
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import styles from '../styles/CreatePost.module.scss';


const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleCreatePost = async (): Promise<void> => {
    if (title.trim() && content.trim()) {
      await createPost({ title, content });
      setTitle('');
      setContent('');
    }
  };

  const handleCancel = (): void => {
    setTitle('');
    setContent('');
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Create a New Post
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <div className={styles.actions}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreatePost}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Create Post'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </Container>
  );
};

export default CreatePost;
