import { useContext, useState } from "react";
import { Box, Button, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import {  Modaltrigger } from "../../context/AuthContext";
import { MdDelete } from "react-icons/md";
import { useGoalDelete } from "../api/databook/route-data";

export function Delete({ data, message, name }) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { triggerComponent } = useContext(Modaltrigger); 
  
    const { deleteGoals } = useGoalDelete();
  
    const deleteFunctions = {
      assignGoal: deleteGoals,
    };
  
    const handleDelete = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        if (!name || !deleteFunctions[name]) {
          //showToast("Invalid delete action", "error");
          return;
        }
  
        const { id} = data;
        const deleteFunction = deleteFunctions[name];
  
        const response = await deleteFunction(id);
  
        if (response?.status === 201) {
          //showToast("Successfully deleted", "success");
          triggerComponent();
          handleClose();
        } else {
         // showToast("Failed to delete. Please try again", "error");
          console.error("Delete failed:", response);
        }
      } catch (error) {
        //showToast("An error occurred. Please try again later.", "error");
        console.error("Delete error:", error);
      } finally {
        setIsSubmitting(false);
        setOpen(false); // Close the modal after the operation
      }
    };
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <IconButton onClick={handleOpen}>
          <MdDelete color="red" />
        </IconButton>
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)", width: 450, bgcolor: "white", borderBottom: "4px solid #000", boxShadow: "40px rgba(0, 0, 0, 0.2)", borderRadius: "8px", p: 2 }}>
            <div className="flex flex row items-center justify-center mb-4">
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"  stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path  stroke-linecap="round"  stroke-linejoin="round"  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                </svg>
              </div>
              <div className="ml-2">
                <Typography component="h2">{message}</Typography>
              </div>
            </div>
            <div className="flex flex-row pb-3 pt-2 px-2 flex-row-reverse items-center">
              <button className="p-3 m-2 bg-transparent hover:bg-blue-900 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="submit" onClick={handleDelete} disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex flex-row justify-center">
                    <p className="text-sm pr-2">loading...</p>
                    <CircularProgress size={27} thickness={6} color="primary" />
                  </div>
                ) : (
                  "Yes"
                )}
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }