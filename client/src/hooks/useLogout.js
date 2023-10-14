import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNotesContext } from "./useNotesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatchNotes } = useNotesContext();
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setIsLoading(true);
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchNotes({ type: "SET_NOTES", payload: null });
    setIsLoading(false);
  };

  return { logout, isLoading };
};
