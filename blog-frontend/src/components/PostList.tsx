import React, { useState } from 'react';
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from '../store/postsSlice';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Fab,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/PostList.module.scss';

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostList: React.FC = () => {
 const { data: posts = [], isLoading, error } = useGetPostsQuery(undefined, {
        skip: false,
      });

  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [newPost, setNewPost] = useState<Post>({ id: 0, title: '', content: '' });
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const postsPerPage = 6;
  const filteredPosts = posts.filter((post: Post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  const navigate = useNavigate();

  const handleAddOrEditPost = async () => {
    if (editPost) {
      await updatePost({ id: editPost.id, title: editPost.title, content: editPost.content });
    } else {
      await createPost(newPost);
    }
    setNewPost({ id: 0, title: '', content: '' });
    setEditPost(null);
    setIsDialogOpen(false);
  };

  const handleEditPost = (post: Post) => {
    setEditPost(post);
    setIsDialogOpen(true);
  };

  const handleDeletePost = async (id: number) => {
    await deletePost(id);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <CircularProgress size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <Typography variant="h4" color="error">
          Error loading posts
        </Typography>
      </div>
    );
  }

  return (
    <Container maxWidth="lg" className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography
          variant="h3"
          align="center"
          className={styles.title}
          gutterBottom
        >
          All Posts
        </Typography>
      </motion.div>

      <TextField
        label="Search posts"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchField}
      />

      <Grid container spacing={4}>
        {paginatedPosts.map((post: Post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: '0px 8px 20px rgba(0,0,0,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className={styles.postCard}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    className={styles.postTitle}
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="body2" className={styles.postContent}>
                    {post.content.length > 100
                      ? `${post.content.slice(0, 100)}...`
                      : post.content}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/posts/${post.id}`)}
                    className={styles.readMoreButton}
                  >
                    Read More
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditPost(post)}
                    className={styles.editButton}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeletePost(post.id)}
                    className={styles.deleteButton}
                  >
                    Delete Post
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(filteredPosts.length / postsPerPage)}
        page={page}
        onChange={(_, value) => setPage(value)}
        className={styles.pagination}
      />

      <Fab
        color="primary"
        className={styles.addPostFab}
        onClick={() => {
          setEditPost(null);
          setIsDialogOpen(true);
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>{editPost ? 'Edit Post' : 'Add New Post'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editPost ? editPost.title : newPost.title}
            onChange={(e) =>
              editPost
                ? setEditPost({ ...editPost, title: e.target.value })
                : setNewPost({ ...newPost, title: e.target.value })
            }
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={editPost ? editPost.content : newPost.content}
            onChange={(e) =>
              editPost
                ? setEditPost({ ...editPost, content: e.target.value })
                : setNewPost({ ...newPost, content: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrEditPost}
            disabled={
              !(editPost
                ? editPost.title.trim() && editPost.content.trim()
                : newPost.title.trim() && newPost.content.trim())
            }
          >
            {editPost ? 'Save Changes' : 'Add Post'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setIsDialogOpen(false);
              setNewPost({ id: 0, title: '', content: '' });
              setEditPost(null);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PostList;
