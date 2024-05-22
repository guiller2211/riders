import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User, Auth } from "firebase/auth";
import appFirebase from "../../../../../apps/ducati/app/server/firebase.service";

// Crear el contexto de autenticación
const AuthContext = createContext<{ user: User | null, loading: boolean, auth: Auth | null }>({
  user: null,
  loading: true,
  auth: null,
});

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<Auth | null>(null); 

  useEffect(() => {
    const authInstance = getAuth(appFirebase);
    setAuth(authInstance); // Establecer auth aquí

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
