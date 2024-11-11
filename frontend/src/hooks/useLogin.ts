import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";

interface LoginTypes {
  username: string;
  password: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();
  const toast = useToast();
  const login = async ({ username, password }: LoginTypes) => {
    console.log(username);
    console.log(password);
    const success = handleInputErrors(username, password, toast);
    if (!success) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!data) {
        throw new Error(data?.error);
      }

      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      console.error("Error occured in login-catch ", error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

const handleInputErrors = (
  username: string,
  password: string,
  toast: ReturnType<typeof useToast>
) => {
  if (!username || !password) {
    toast({
      title: "Error",
      description: "Please fill all the fields",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    return false;
  }
  return true;
};
