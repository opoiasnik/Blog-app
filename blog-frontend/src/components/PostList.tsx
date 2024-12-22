import React, { useState } from 'react';
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} from '../store/postsSlice';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import styles from '../styles/PostList.module.scss';

const PostList: React.FC = () => {
  const { data: posts = [], isLoading, error } = useGetPostsQuery(undefined, {
        skip: false,
      });
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreatePost = async () => {
    if (newPost.title.trim().length < 3 || newPost.content.trim().length < 10) {
      setSnackbarMessage(
        'Title must be at least 3 characters and content at least 10 characters.'
      );
      setSnackbarOpen(true);
      return;
    }
    await createPost(newPost);
    setSnackbarMessage('Post created successfully!');
    setSnackbarOpen(true);
    setNewPost({ title: '', content: '' });
    setIsDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4">Posts</Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item key={post.id}>
            <Card>
              <CardContent>
                <Typography>{post.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button onClick={() => setIsDialogOpen(true)}>Add Post</Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <TextField
            label="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreatePost}>Create</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="info" onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PostList;
