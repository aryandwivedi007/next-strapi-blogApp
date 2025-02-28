
"use client";

import { useMemo } from "react";
import { useGetBlogsQuery } from "./service/api"; 
import HeaderComponent from "./components/HeaderComponent";
import BlogComponent from "./components/BlogComponent";
import { Box, CircularProgress, Typography, Grid } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const { data, isLoading, error } = useGetBlogsQuery();

  const featuredBlogs = useMemo(() => data?.data ?? [], [data]); // memoization

  return (
    <div>
      <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: 2 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Featured Blogs
        </Typography>

        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            Failed to load blogs.
          </Typography>
        ) : featuredBlogs.length > 0 ? (
          <Grid container spacing={3}>
            {featuredBlogs.map((blog, index) => (
              <Grid item xs={12} sm={6} key={blog.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }} // ✅ Staggered effect
                >
                  <Link
                    href={`/blog/${blog.Slug}`}
                    passHref
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <BlogComponent
                      title={blog.Title}
                      summary={blog.Summary}
                      category={blog.Category}
                      content={blog.Content}
                      thumbnail={blog.Thumbnail?.formats?.small?.url || blog.Thumbnail?.url}
                    />
                  </Link>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography textAlign="center">No featured blogs available.</Typography>
        )}
      </Box>
    </div>
  );
}
