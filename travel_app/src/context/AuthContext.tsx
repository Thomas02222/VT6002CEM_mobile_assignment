// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  biometricLogin: () => Promise<boolean>;
  setBiometricEnabled: (enabled: boolean) => Promise<void>;
  isBiometricEnabled: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const setBiometricEnabled = async (enabled: boolean) => {
  await AsyncStorage.setItem("biometricEnabled", enabled ? "true" : "false");
};

const isBiometricEnabled = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem("biometricEnabled");
  return value === "true";
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser(result.user);

    await SecureStore.setItemAsync("savedEmail", email);
    await SecureStore.setItemAsync("savedPassword", password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`,
    });
    setUser(userCredential.user);

    await SecureStore.setItemAsync("savedEmail", email);
    await SecureStore.setItemAsync("savedPassword", password);
  };

  const biometricLogin = async (): Promise<boolean> => {
    const enabled = await isBiometricEnabled();
    if (!enabled) return false;

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supported = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !supported) return false;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to login",
    });

    if (!result.success) return false;

    const email = await SecureStore.getItemAsync("savedEmail");
    const password = await SecureStore.getItemAsync("savedPassword");

    if (email && password) {
      try {
        await login(email, password);
        return true;
      } catch (error) {
        return false;
      }
    }

    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        biometricLogin,
        setBiometricEnabled,
        isBiometricEnabled,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
