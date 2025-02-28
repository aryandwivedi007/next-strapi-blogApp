// "use client"; // Required for Next.js App Router

// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import Link from "next/link";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// // ✅ Validation Schema
// const validationSchema = yup.object({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(5, "Minimum 5 characters required")
//     .max(16, "Maximum 16 characters allowed"),
// });

// // ✅ Type Definition for Form Data
// type FormData = yup.InferType<typeof validationSchema>;

// export default function LoginForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ✅ React Hook Form Setup
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm<FormData>({
//     defaultValues: { email: "", password: "" },
//     resolver: yupResolver(validationSchema),
//     mode: "onChange",
//   });

//   // ✅ Handle Login
//   const onSubmit = async (data: FormData) => {
//     setLoading(true);
//     console.log("Login Data:", data);
//     setTimeout(() => {
//       setLoading(false);
//       alert("Login Successful!"); // Replace with API call
//     }, 2000);
//   };

//   return (
//     <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
//       <Card
//         variant="outlined"
//         sx={{
//           maxWidth: 400,
//           width: "100%",
//           padding: "24px",
//           borderRadius: "8px",
//           textAlign: "center",
//         }}
//       >
//         <CardContent>
//           <Typography variant="h4" fontWeight="bold">
//             Welcome!
//           </Typography>
//           <Typography my={1}>Sign in to continue.</Typography>

//           <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//             {/* Email Field */}
//             <TextField
//               sx={{ mt: 2 }}
//               fullWidth
//               type="email"
//               label="Email"
//               placeholder="Enter your email"
//               {...register("email")}
//               error={Boolean(errors.email?.message)}
//               helperText={errors.email?.message}
//             />

//             {/* Password Field with Visibility Toggle */}
//             <TextField
//               sx={{ mt: 2 }}
//               fullWidth
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               {...register("password")}
//               error={Boolean(errors.password?.message)}
//               helperText={errors.password?.message}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setShowPassword((prev) => !prev)}>
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               sx={{ mt: 3, fontWeight: "bold", py: 1.5 }}
//               variant="contained"
//               fullWidth
//               disabled={!isValid || loading}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : "Log in"}
//             </Button>

//             {/* Sign Up Link */}
//             <Typography textAlign="center" mt={2}>
//               Don&apos;t have an account?{" "}
//               <Link href="/signup" style={{ color: "#1976d2", textDecoration: "none" }}>
//                 Sign up
//               </Link>
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginMutation } from "../service/api"; // ✅ Import API Hook
import { useRouter } from "next/navigation"; // ✅ Redirect after login
import { useDispatch } from "react-redux";
import { setTokens } from "../store/reducer/authReducer"; 

// ✅ Validation Schema
const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
});

// ✅ Type Definition for Form Data
type FormData = yup.InferType<typeof validationSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginUser, { isLoading, isError, error: apiError, isSuccess, data }] = useLoginMutation(); // ✅ Use RTK Query

  // ✅ Handle Login Form Submission
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser({
        identifier: data.email,
        password: data.password,
      }).unwrap();

      console.log("Login Success:", response);

      if (response.jwt) {
        // ✅ Save Token and Update Redux State
        dispatch(setTokens({ accessToken: response.jwt }));
        localStorage.setItem("access_token", response.jwt);

        // ✅ Redirect to Homepage
        router.push("/");
      }
    } catch (err: any) {
      setError(err.data?.message || "Login failed. Please try again.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Card
        variant="outlined"
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: "24px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold">
            Welcome!
          </Typography>
          <Typography my={1}>Sign in to continue.</Typography>

          {/* ✅ Show Error Message if login fails */}
          {error && (
            <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...register("email")}
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
            />

            {/* Password Field with Visibility Toggle */}
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              sx={{ mt: 3, fontWeight: "bold", py: 1.5 }}
              variant="contained"
              fullWidth
              disabled={!isValid || loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Log in"}
            </Button>

            {/* Sign Up Link */}
            <Typography textAlign="center" mt={2}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" style={{ color: "#1976d2", textDecoration: "none" }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
