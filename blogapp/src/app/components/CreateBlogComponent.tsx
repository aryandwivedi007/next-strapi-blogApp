
// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   CircularProgress,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { useCreateBlogMutation, useMeQuery,useGetBlogByIdQuery } from "../service/api"; // ✅ API Hooks
// import { useAppSelector } from "../store/store"; // ✅ Get user from Redux

// // ✅ Available categories (Can be fetched from an API)
// const categories = ["Tech", "Health", "Business", "Lifestyle", "Education"];

// // ✅ Validation Schema
// const blogSchema = yup.object({
//   title: yup.string().required("Title is required"),
//   summary: yup.string().required("Summary is required"),
//   content: yup.string().required("Content is required"),
//   category: yup.string().required("Category is required"),
// });

// // ✅ TypeScript Form Data Type
// type BlogFormData = yup.InferType<typeof blogSchema>;

// export default function CreateBlogForm() {
//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const [createBlog, { isLoading }] = useCreateBlogMutation();
//   const { data: userData } = useMeQuery(undefined, { skip: !isAuthenticated });

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     reset,
//   } = useForm<BlogFormData>({
//     resolver: yupResolver(blogSchema),
//   });

//   // ✅ Handle Form Submission
//   const onSubmit = async (data: BlogFormData) => {
//     if (!userData?.id) {
//       alert("User not authenticated");
//       return;
//     }

//     const slug = data.title.toLowerCase().replace(/\s+/g, "-"); // ✅ Generate slug

//     try {
//       await createBlog({
//         title: data.title,
//         summary: data.summary,
//         content: data.content,
//         category: data.category, // ✅ User-selected category
//         user: userData.id, // ✅ Attach user ID from API response
//         slug, // ✅ Auto-generated slug
//       }).unwrap();

//       alert("Blog created successfully!");
//       reset();
//     } catch (error) {
//       console.error("❌ Blog creation failed:", error);
//       alert("Failed to create blog!");
//     }
//   };

//   return (
//     <Box maxWidth={600} mx="auto" mt={4} p={3} boxShadow={3} borderRadius={2}>
//       <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
//         Create a Blog
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
//         {/* ✅ Title */}
//         <TextField
//           label="Title"
//           fullWidth
//           {...register("title")}
//           error={!!errors.title}
//           helperText={errors.title?.message}
//           margin="normal"
//         />

//         {/* ✅ Summary */}
//         <TextField
//           label="Summary"
//           fullWidth
//           multiline
//           rows={3}
//           {...register("summary")}
//           error={!!errors.summary}
//           helperText={errors.summary?.message}
//           margin="normal"
//         />

//         {/* ✅ Content */}
//         <TextField
//           label="Content"
//           fullWidth
//           multiline
//           rows={5}
//           {...register("content")}
//           error={!!errors.content}
//           helperText={errors.content?.message}
//           margin="normal"
//         />

//         {/* ✅ Category Selection */}
//         <FormControl fullWidth margin="normal" error={!!errors.category}>
//           <InputLabel>Category</InputLabel>
//           <Select
//             defaultValue=""
//             {...register("category")}
//             onChange={(e) => setValue("category", e.target.value)}
//           >
//             {categories.map((cat) => (
//               <MenuItem key={cat} value={cat}>
//                 {cat}
//               </MenuItem>
//             ))}
//           </Select>
//           {errors.category && (
//             <Typography color="error" variant="body2">
//               {errors.category.message}
//             </Typography>
//           )}
//         </FormControl>

//         {/* ✅ Submit Button */}
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mt: 3 }}
//           disabled={isLoading}
//         >
//           {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Blog"}
//         </Button>
//       </Box>
//     </Box>
//   );
// }
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useCreateBlogMutation, useMeQuery } from "../service/api"; // ✅ API Hooks
import { useAppSelector } from "../store/store";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

// ✅ Available categories
const categories = ["Tech", "Health", "Business", "Lifestyle", "Education"];

// ✅ Validation Schema
const blogSchema = yup.object({
  title: yup.string().required("Title is required"),
  summary: yup.string().required("Summary is required"),
  content: yup.string().required("Content is required"),
  category: yup.string().required("Category is required"),
});

// ✅ TypeScript Form Data Type
type BlogFormData = yup.InferType<typeof blogSchema>;

export default function CreateBlogForm() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const { data: userData } = useMeQuery(undefined, { skip: !isAuthenticated });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BlogFormData>({
    resolver: yupResolver(blogSchema),
  });

  // ✅ Handle Form Submission
  const onSubmit = async (data: BlogFormData) => {
    if (!userData?.id) {
      alert("User not authenticated");
      return;
    }

    const slug = data.title.toLowerCase().replace(/\s+/g, "-");

    try {
      await createBlog({
        title: data.title,
        summary: data.summary,
        content: data.content,
        category: data.category,
        user: userData.id,
        slug,
      }).unwrap();

      alert("Blog created successfully!");
      reset();
    } catch (error) {
      console.error("❌ Blog creation failed:", error);
      alert("Failed to create blog!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        maxWidth={600}
        mx="auto"
        mt={4}
        p={3}
        boxShadow={3}
        borderRadius={2}
        sx={{ backgroundColor: "white" }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          textAlign="center"
          component={motion.h4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Create a Blog
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* ✅ Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TextField
              label="Title"
              fullWidth
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
              margin="normal"
            />
          </motion.div>

          {/* ✅ Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TextField
              label="Summary"
              fullWidth
              multiline
              rows={3}
              {...register("summary")}
              error={!!errors.summary}
              helperText={errors.summary?.message}
              margin="normal"
            />
          </motion.div>

          {/* ✅ Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <TextField
              label="Content"
              fullWidth
              multiline
              rows={5}
              {...register("content")}
              error={!!errors.content}
              helperText={errors.content?.message}
              margin="normal"
            />
          </motion.div>

          {/* ✅ Category Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <FormControl fullWidth margin="normal" error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                defaultValue=""
                {...register("category")}
                onChange={(e) => setValue("category", e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography color="error" variant="body2">
                  {errors.category.message}
                </Typography>
              )}
            </FormControl>
          </motion.div>

          {/* ✅ Submit Button with Hover Animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                transition: "0.3s",
                "&:hover": { backgroundColor: "#1565C0" },
              }}
              disabled={isLoading}
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Blog"}
            </Button>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
}
