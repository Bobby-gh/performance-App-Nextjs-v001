'use client'
import React, { useContext, useState } from "react";
import { AuthContext } from "../contex/context-context";
import { FaEye } from "react-icons/fa";
import { Box, FormControl, Modal, TextField } from "@mui/material";


export function AssignGoal(params) {
    const {auth} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    const [assignGoal, setAssignedGoal] = useState({
        goalId: params._id,
        goalTitle: params.goalTitle,
        goalDescription:params.goalDescription
    })
    
  
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "#FFFFFF",
      boxShadow: 24,
      p: 4,
      borderRadius: 1,
      width: 1200,
    };
  
    function handleOpen() {
      setOpen(!open);
    }
  
    function handleClose() {
      setOpen(false);
    }
  
    const handleEditSubmit = async (e) => {
      e.preventDefault();
      
    };
    return (
      <>
        <button onClick={handleOpen} className="px-2">
          <FaEye className="icons" />
        </button>
        <Modal
          open={open}
          onClose={close}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <FormControl fullWidth>
              <div className=" px-10 py-10">
                <div className="grid grid-cols-4 gap-3 mb-6">
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <TextField
                      label="Goal ID"
                    //   value={riskID}
                      autoComplete="off"
                    //   onChange={(e) => setRiskID(e.target.value)}
                      disabled
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <TextField
                      label="Goal Title"
                      value={goalTitle}
                      autoComplete="off"
                    //   onChange={(e) => setRiskName(e.target.value)}
                      disabled
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <InputLabel>Response Activity Status</InputLabel>
                    <Select
                      label="Response Activity Status"
                    //   value={riskResponseActivitiyStatus}
                      autoComplete="off"
                    //   onChange={(e) =>
                    //     setRiskResponseActivitiyStatus(e.target.value)
                    //   }
                      required
                      style={{ width: "100%" }}>
                      <MenuItem value="YES">YES</MenuItem>
                      <MenuItem value="NO">NO</MenuItem>
                    </Select>
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <TextField
                      type="date"
                      label="Created At"
                    //   value={cDate}
                      autoComplete="off"
                    //   onChange={(e) => {
                    //     const selectedDate = e.target.value;
                    //     const dateObj = new Date(selectedDate);
  
                    //     // Extract year, month, and day components
                    //     const year = dateObj.getFullYear();
                    //     const month = String(dateObj.getMonth() + 1).padStart(
                    //       2,
                    //       "0"
                    //     );
                    //     const day = String(dateObj.getDate()).padStart(2, "0");
  
                    //     // Format the date as "yyyy-MM-dd"
                    //     const formattedDate = `${year}-${month}-${day}`;
                    //     // Set the formatted date to state
                    //     setRiskCreatedAt(formattedDate);
                    //   }}
                      disabled
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <TextField
                      label="challenges"
                    //   value={challenges}
                      multiline
                      autoComplete="off"
                    //   onChange={(e) => setChallenges(e.target.value)}
                      required
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <TextField
                      label="Response Implementation"
                      multiline
                    //   value={riskResponseImplementation}
                      autoComplete="off"
                    //   onChange={(e) =>
                    //     setRiskResponseImplementation(e.target.value)
                    //   }
                      required
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <TextField
                      label="Recomended Changes"
                      multiline
                    //   value={recommendedChanges}
                      autoComplete="off"
                    //   onChange={(e) => setRecommendedChanges(e.target.value)}
                      required
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <TextField
                      label="Comments"
                      multiline
                    //   value={comments}
                      autoComplete="off"
                    //   onChange={(e) => setComments(e.target.value)}
                      required
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <Select
                      label="Risk Reviewer"
                    //   value={mitigationOwner}
                      autoComplete="off"
                    //   onChange={(e) => setMitigationOwner(e.target.value)}
                      required
                      style={{ width: "100%" }}>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row pb-3 pt-2 px-2 flex-row-reverse items-center">
                <button
                  className="flex flex row items-center p-3 m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  type="submit"
                  onClick={handleEditSubmit}>
                  <FaSave className="icons" />
                  Save
                </button>
              </div>
            </FormControl>
          </Box>
        </Modal>
      </>
    );
  }