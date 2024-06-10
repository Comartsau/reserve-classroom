'use client'
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

function Reserve() {
  const router = useRouter();

  const handleHomePage = () => {
    router.push("/user");
  };

  return (
    <div>
      <Typography> Reserve Page</Typography>

      <Button variant="contained" onClick={handleHomePage}>Home Page</Button>
    </div>
  );
}

export default Reserve;
