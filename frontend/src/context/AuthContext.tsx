import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  authUser: any;
  setAuthUser: React.Dispatch<React.SetStateAction<any>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<any>(
    JSON.parse(localStorage.getItem("chatUser") || "null")
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
