import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations"; // Update with your mutation
import SkeletonLoader from "../components/skeleton";

// Define the type for form data
interface IFormInput {
  email: string;
  password: string;
}

// Yup validation schema
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  // Set up React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data: IFormInput) => {
    try {
      const { data: userData } = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      localStorage.setItem("accessToken", userData.loginUser.token);
      // Handle successful login
      toast.success("Login successful!");
      // You can save the user data (e.g., access token) in your state management or local storage
      navigate("/dashboard");
    } catch (err) {
      // Handle error
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        margin: "auto",
        marginTop: "190px",
        border: "5px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Login
          </Typography>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={loading}
            sx={{ mb: 2 }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loading}
            sx={{ mb: 2 }}
          />

          {/* Submit Button */}
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </motion.div>

          <Typography
            variant="body2"
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>

          {/* Forgot Password Link */}
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: 2,
            }}
          >
            <Link to="/forgetPassword">Forgot Password?</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
