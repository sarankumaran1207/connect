import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createActor } from "../backend";
import type { UserProfile } from "../backend.d.ts";

export interface AuthContextValue {
  isLoggedIn: boolean;
  currentUser: UserProfile | null;
  isLoading: boolean;
  isInitializing: boolean;
  logout: () => void;
  login: () => void;
  register: () => void;
  isLoggingIn: boolean;
  isLoginError: boolean;
  loginError: Error | undefined;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getBackendActor() {
  const noop = async () => new Uint8Array();
  const noopDown = async () => ({
    directURL: "",
    getBytes: noop,
    getDirectURL: () => "",
    withUploadProgress: () => ({
      directURL: "",
      getBytes: noop,
      getDirectURL: () => "",
      withUploadProgress: () => null as never,
      _blob: undefined,
      onProgress: undefined,
    }),
  });
  return createActor(
    (window as unknown as Record<string, string>).__CANISTER_ID_BACKEND__ ?? "",
    noop,
    noopDown as never,
    {},
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    identity,
    isInitializing,
    isLoginSuccess,
    clear,
    login: iiLogin,
    isLoggingIn,
    isLoginError,
    loginError,
  } = useInternetIdentity();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile when identity changes
  useEffect(() => {
    if (isInitializing) return;
    if (!isLoginSuccess || !identity) {
      setCurrentUser(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const actor = getBackendActor();
    actor
      .getCallerUserProfile()
      .then((profile) => {
        setCurrentUser(profile);
      })
      .catch(() => {
        setCurrentUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoginSuccess, identity, isInitializing]);

  const logout = useCallback(() => {
    clear();
    setCurrentUser(null);
  }, [clear]);

  const login = useCallback(() => {
    iiLogin();
  }, [iiLogin]);

  const register = useCallback(() => {
    iiLogin();
  }, [iiLogin]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoginSuccess && !!currentUser,
        currentUser,
        isLoading: isLoading || isInitializing,
        isInitializing,
        logout,
        login,
        register,
        isLoggingIn,
        isLoginError,
        loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
}
