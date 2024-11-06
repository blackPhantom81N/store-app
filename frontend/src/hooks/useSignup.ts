import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";

interface UserType {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { authUser, setAuthUser } = useAuthContext();
  const toast = useToast();
  // const toast = useToast();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    email,
    gender,
  }: UserType): Promise<void> => {
    const success = handleInputErrors(
      {
        fullName,
        username,
        password,
        confirmPassword,
        email,
        gender,
      },
      toast
    );

    if (!success) {
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();
      if (data?.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

const handleInputErrors = (
  { fullName, username, password, confirmPassword, gender }: UserType,
  toast: ReturnType<typeof useToast>
): boolean => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    return false;
  }

  if (password !== confirmPassword) {
    toast({
      title: "Error",
      description: "Passwords do not match",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    return false;
  }

  if (password.length < 6) {
    toast({
      title: "Error",
      description: "Password must be at least 6 characters",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    return false;
  }

  return true;
};
