import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Fade,
} from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import SkeletonLoader from "../components/skeleton";
import { useMutation } from "@apollo/client";
import { SIGN_UP_MUTATION } from "../graphql/mutations"; // Import the mutation
import "react-toastify/dist/ReactToastify.css";
// Validation schema with Yup
const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});

const SignupForm = () => {
  const navigate = useNavigate();
  const [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION); // Use Apollo Client's useMutation hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: async (data) => {
      return await schema
        .validate(data, { abortEarly: false })
        .then(() => ({ values: data, errors: {} }))
        .catch((err) => ({
          values: {},
          errors: err.inner.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.path]: curr.message,
            }),
            {}
          ),
        }));
    },
  });

  const onSubmit = async (data) => {
    try {
      //   console.log(data);
      const { data: responseData } = await signUp({
        variables: {
          username: data.name,
          email: data.email,
          password: data.password,
        },
      });
      console.log(responseData);
      if (responseData.createUser) {
        const { token, refreshToken } = responseData.createUser;
        // Store tokens in cookies or localStorage
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);

        // Navigate to dashboard or another page
        toast.success("Sign up successful!");
        // navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error("Sign up failed. Please try again.");
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
        <Fade in timeout={500}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
        </Fade>

        <form onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Fade in timeout={800}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ opacity: 1, transition: "opacity 1s" }}
            />
          </Fade>

          <Fade in timeout={900}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ opacity: 1, transition: "opacity 1s" }}
            />
          </Fade>

          <Fade in timeout={1000}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ opacity: 1, transition: "opacity 1s" }}
            />
          </Fade>

          <Fade in timeout={1200}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Fade>

          <Fade in timeout={1400}>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Typography sx={{ mt: 2 }}>
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
            </Box>
          </Fade>
        </form>
      </Box>
    </Container>
  );
};

export default SignupForm;
