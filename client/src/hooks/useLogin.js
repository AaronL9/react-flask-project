import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios, {AxiosError} from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN", payload: response.data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return { login, isLoading, error };
};
