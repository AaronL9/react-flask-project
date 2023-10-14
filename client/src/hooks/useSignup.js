import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        name,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN", payload: response.data });
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }

  };

  return { signup, isLoading, error };
};
