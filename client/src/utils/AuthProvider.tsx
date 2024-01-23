import React, { createContext, useContext, useState } from "react";

type AuthContextProps = {
  user: { email: string; password: string; token: string } | null;
  login: (user: { email: string; password: string; token: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{
    email: string;
    password: string;
    token: string;
  } | null>(null);

  function login(user: { email: string; password: string; token: string }) {
    setUser(user);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
