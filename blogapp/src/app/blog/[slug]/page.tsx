
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
  useGetBlogBySlugQuery,
  useGetCommentsByBlogQuery,
  useCreateCommentMutation,
  useUpdateBlogMutation,
  useMeQuery,
} from "../../service/api";
import { useAppSelector } from "../../store/store";
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion"; 
import Head from "next/head";

export default function BlogPost() {
  const { slug } = useParams();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: userData } = useMeQuery(undefined, { skip: !isAuthenticated });
  const { data, isLoading, error, refetch } = useGetBlogBySlugQuery(slug as string);
  const blog = data?.data?.[0];
  const { data: commentsData, refetch: refetchComments } = useGetCommentsByBlogQuery(blog?.id, {
    skip: !blog?.id,
  });


  const [updateBlog] = useUpdateBlogMutation();
  const [likes, setLikes] = useState(blog?.likeCount || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!blog) return;

    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));

    try {
      const newLikeCount = liked ? likes - 1 : likes + 1;
      await updateBlog({ id: blog.id, likeCount: newLikeCount }).unwrap();
    } catch (error) {
      console.error("❌ Failed to update likes:", error);
    }
  };

  
  const [comment, setComment] = useState("");
  const [createComment, { isLoading: isCommenting }] = useCreateCommentMutation();

  const handleCommentSubmit = async () => {
    if (!userData?.id) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      await createComment({
        content: comment,
        blog: blog.id,
        user: userData.id,
        IsFeatured: false,
      }).unwrap();
      setComment("");
      refetchComments();
      alert("Comment submitted successfully!");
    } catch (error) {
      console.error("❌ Failed to submit comment:", error);
    }
  };

  // ✅ Filter Featured Comments
  const featuredComments = commentsData?.data?.filter((comment) => comment.IsFeatured);

  return (
    <>
    
   
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            Failed to load blog.
          </Typography>
        ) : blog ? (
          <>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h3" fontWeight="bold">
                  {blog.Title}
                </Typography>

              
                <Box display="flex" alignItems="center">
                  <motion.div whileTap={{ scale: 1.2 }}>
                    <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
                      <FavoriteIcon />
                    </IconButton>
                  </motion.div>
                  <Typography variant="body2">{likes} Likes</Typography>
                </Box>
              </Box>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                Category: {blog.Category}
              </Typography>
              <Typography variant="body1" mt={2}>
                {blog.Content}
              </Typography>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Box mt={4}>
                <Typography variant="h5" fontWeight="bold">
                  Featured Comments
                </Typography>

               
                {featuredComments?.length > 0 ? (
                  featuredComments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Box sx={{ mt: 2, p: 2, borderBottom: "1px solid #ddd" }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {comment.user?.username ?? "Anonymous"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {comment.content}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))
                ) : (
                  <Typography mt={2}>No featured comments yet.</Typography>
                )}

             
                {isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Box mt={3}>
                      <TextField
                        label="Write a comment..."
                        fullWidth
                        multiline
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        margin="normal"
                      />
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={handleCommentSubmit}
                          disabled={isCommenting || comment.trim() === ""}
                          sx={{ mt: 2 }}
                        >
                          {isCommenting ? "Submitting..." : "Add Comment"}
                        </Button>
                      </motion.div>
                    </Box>
                  </motion.div>
                )}
              </Box>
            </motion.div>
          </>
        ) : (
          <Typography textAlign="center">Blog not found.</Typography>
        )}
      </Box>
    </motion.div>
    </>
  );
}
