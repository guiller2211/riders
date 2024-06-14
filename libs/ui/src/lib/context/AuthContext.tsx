import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User, Auth } from "firebase/auth";
import appFirebase from "../../../../providers/firebase/src/lib/services/firebase.service";

const AuthContext = createContext<{ user: User | null, loading: boolean, auth: Auth | null }>({
  user: null,
  loading: true,
  auth: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<Auth | null>(null); 

  useEffect(() => {
    const authInstance = getAuth(appFirebase);
    setAuth(authInstance); 

    if (typeof window !== 'undefined') {
      const body = document.querySelector('body');
      if (body) {
        body.setAttribute('cz-shortcut-listen', 'true');
      }
    }

    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
