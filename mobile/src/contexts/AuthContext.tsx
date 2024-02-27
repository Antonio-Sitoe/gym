import { createContext, useContext, useEffect, useState } from "react";
import { UserTYpe } from "@/dtos/userDTO";
import { api } from "@/lib/axios";
import { removeUser, storageUserSave, userGet } from "@/storage/user";

export type AuthContextDataProps = {
  user: UserTYpe;
  loadUser: boolean;
  signInFn: (params: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthStorage = ({ children }: { children: React.JSX.Element }) => {
  const [user, setUser] = useState<UserTYpe>({} as UserTYpe);
  const [loadUser, setLoadUser] = useState(false);

  async function signInFn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const { data } = await api.post<{
        user: UserTYpe;
      }>("/sessions", {
        email,
        password,
      });
      if (data?.user) {
        setUser(data?.user);
        storageUserSave(data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function signOut() {
    try {
      setLoadUser(true);
      setUser({} as UserTYpe);
      await removeUser();
    } catch (error) {
    } finally {
      setLoadUser(false);
    }
  }

  async function loadUserData() {
    setLoadUser(true);
    const user = await userGet();
    if (user) setUser(user);
    setLoadUser(false);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInFn,
        loadUser,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
