import React from "react";
import { Skeleton, Box } from "@mui/material";

const SkeletonLoader = () => {
  return (
    <Box sx={{ padding: 3 }}>
      {/* Skeletons to mimic the layout */}
      <Skeleton
        variant="text"
        width="100%"
        height={40}
        sx={{ marginBottom: 2 }}
      />
      <Skeleton
        variant="text"
        width="60%"
        height={30}
        sx={{ marginBottom: 2 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        sx={{ marginBottom: 2 }}
      />
      <Skeleton variant="text" width="80%" height={30} />
    </Box>
  );
};

export default SkeletonLoader;
