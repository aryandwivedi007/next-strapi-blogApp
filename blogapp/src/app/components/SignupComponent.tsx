"use client"; // Required for Next.js App Router
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { createStyles } from "@mui/styles";
import { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";
import * as yup from "yup";
// import { useRegisterMutation } from "../services/api"; // Adjust path as per your structure
import PasswordInput from "./PasswordInput"; // Adjust path as needed

const validation = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
});

const useStyle = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 450,
      width: "100%",
      border: "1px solid #e2e2e2",
      borderRadius: "8px",
      boxShadow: "none",
      mx: "auto",
    },
    input: {
      mt: 2,
      "& .MuiOutlinedInput-root": {
        borderRadius: "4px",
        backgroundColor: "#fafafa",
      },
      "& .MuiInputLabel-root": {
        color: "#757575",
      },
    },
    button: {
      my: 3,
      py: 1,
      borderRadius: "50px",
      textTransform: "none",
      fontSize: "16px",
      fontWeight: 600,
      backgroundColor: "#1a8917",
      "&:hover": {
        backgroundColor: "#156d12",
      },
    },
    link: {
      color: "#1a8917",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    text: {
      fontFamily: "Georgia, serif",
      color: "#171717",
    },
  });

type FormData = typeof validation.__outputType;

export default function SignupForm() {
  const theme = useTheme();
  const style = useStyle(theme);
//   const [registerUser] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      //await registerUser(data).unwrap();
      toast.success("User registered successfully!");
      window.location.href = "/"; // Redirect after success
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9f9f9",
      }}
    >
      <Card variant="outlined" sx={style.root}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" sx={style.text}>
                Create an account
              </Typography>
              <Typography variant="body2" sx={{ color: "#757575", mt: 1 }}>
                Start writing on your blog today.
              </Typography>
            </Box>
            <TextField
              sx={style.input}
              fullWidth
              type="text"
              placeholder="Username"
              label="Username"
              {...register("username")}
              error={Boolean(errors.username?.message)}
              helperText={errors.username?.message}
            />
            <TextField
              sx={style.input}
              fullWidth
              type="email"
              placeholder="Email"
              label="Email"
              {...register("email")}
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
            />
            <PasswordInput
              sx={style.input}
              fullWidth
              type="password"
              placeholder="Password"
              label="Password"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register("password")}
            />
            <Button
              type="submit"
              sx={style.button}
              variant="contained"
              fullWidth
              disabled={!isValid}
            >
              Sign Up
            </Button>
            <Typography sx={{ textAlign: "center", color: "#757575" }}>
              Already have an account?{" "}
              <Link href="/login" style={style.link as CSSProperties}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}