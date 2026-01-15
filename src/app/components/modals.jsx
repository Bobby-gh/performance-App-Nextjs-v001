'use client'
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AuthContext } from "../contex/context-context";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";


export function LogOut() {
  const { t } = useTranslation();
  const {clearAuth} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogOut = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      router.push("/", { scroll: false });
      Cookies.remove('token')
      Cookies.remove('name')
      clearAuth()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const style = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "white",
    borderBottom: "4px solid #000",
    boxShadow: "40px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    p: 2,
  };

  return (
    <>
      <button onClick={handleOpen} className="flex items-center">
          <RiLogoutCircleRLine />
          <span className="ml-2">{t("signOut")}</span>
        </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex row items-center justify-center mb-4">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="ml-2">
              <Typography component="h2">
                {t("confirmLogout")}
              </Typography>
            </div>
          </div>
          <div className="flex flex-row pb-3 pt-2 px-2 flex-row-reverse items-center">
            <button
              className="flex flex row items-center p-3 m-2 bg-transparent hover:bg-blue-900 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="submit"
              onClick={handleLogOut}
              disabled={isLoading} 
            >
              {isLoading ? (
                <div className="flex flex-row justify-center">
                  <p className="text-sm pr-2">{t("loading")}</p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                t("yes")
              )}
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
