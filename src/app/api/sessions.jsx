"use client";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

export const LoadingPopup = () => {
  const [isLoading, setLoading] = useState(true);
  try{
    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        },3000);
      }, []);
  }catch(err){
    console.log(err);
  }
 

  return (
    <Backdrop open={isLoading} style={{ zIndex: 9999, color: "#fff" }}>
      <CircularProgress/>
    </Backdrop>
  );
};
