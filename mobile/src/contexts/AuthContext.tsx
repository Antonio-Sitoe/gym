import { createContext, useContext, useEffect, useState } from "react";
import { UserTYpe } from "@/dtos/userDTO";
import { api } from "@/lib/axios";
import {
  getToekn,
  removeUser,
  setToken,
  storageAuthTokenRemove,
  storageUserSave,
  userGet,
} from "@/storage/user";

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
        token: string;
      }>("/sessions", {
        email,
        password,
      });
      if (data?.user && data?.token) {
        setUser(data?.user);
        await storageUserAndTokenSave(data.user, data.token);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function userAndTokenUpdate(userData: UserTYpe, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(userData);
  }

  async function storageUserAndTokenSave(
    userData: UserTYpe,
    token: string,
    // refresh_token: string
  ) {
    try {
      setLoadUser(true);
      await storageUserSave(userData);
      await setToken(token);
    } catch (error) {
      throw error;
    } finally {
      setLoadUser(false);
    }
  }

  async function signOut() {
    try {
      setLoadUser(true);
      setUser({} as UserTYpe);
      await removeUser();
      await storageAuthTokenRemove();
    } catch (error) {
    } finally {
      setLoadUser(false);
    }
  }

  async function loadUserData() {
    setLoadUser(true);
    const user = await userGet();
    const token = await getToekn();
    if (user && token) userAndTokenUpdate(user, token);
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
        signOut,
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
