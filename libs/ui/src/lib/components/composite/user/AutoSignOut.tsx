import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@riders/firebase";
import { AppRoutes } from "@riders/types";

export const AutoSignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        handleSignOut();
      }, 600000);
    };

    const handleSignOut = async () => {
      navigate(AppRoutes.Logout);
    };


    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();


    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [navigate]);

  return null;
};
