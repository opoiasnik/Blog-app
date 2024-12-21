import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" align="center" className={styles.title}>
            Welcome to the Blog
          </Typography>
          <Typography variant="h5" align="center" className={styles.subtitle}>
            Explore posts, share your thoughts, and join the conversation.
          </Typography>
        </motion.div>
        <Box className={styles.buttonContainer}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/posts')}
              className={styles.exploreButton}
            >
              Explore Posts
            </Button>
          </motion.div>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
