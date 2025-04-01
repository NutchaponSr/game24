"use client";

import { 
  createContext, 
  useContext, 
  useEffect, 
  useState
} from "react";

import { JWT } from "@/modules/auth/types/jwt";
import { getSession } from "@/modules/auth/actions/session";

interface AuthContextType {
  user: JWT | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<JWT | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = async () => {
    setLoading(true);
    const session = await getSession();
    setUser(session.data || null);
    setLoading(false);
  };

  useEffect(() => {
    refreshSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};