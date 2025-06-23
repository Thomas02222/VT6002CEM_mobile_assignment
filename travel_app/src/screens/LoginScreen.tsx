import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { loginStyles } from "../styles/login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import * as LocalAuthentication from "expo-local-authentication";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please input all fields");
      return;
    }

    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const supported = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !supported) {
        Alert.alert("Biometric not supported", "Please login manually.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verify your identity",
      });

      if (!result.success) {
        Alert.alert("Authentication Failed", "Fingerprint verification failed");
        return;
      }

      await login(email, password);
      Alert.alert("Success", "Successfully logged in");
      navigation.navigate("Tabs", { screen: "Home" });
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={loginStyles.container.backgroundColor}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={loginStyles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={loginStyles.scrollContainer}>
          <View style={loginStyles.logoContainer}>
            <Text style={loginStyles.logoText}>Welcome back</Text>
            <Text style={loginStyles.logoSubtext}>
              Please input your email and password
            </Text>
          </View>

          <View style={loginStyles.formContainer}>
            <Text style={loginStyles.formTitle}>Login</Text>

            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.inputLabel}>Email</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.inputLabel}>Password</Text>
              <View style={loginStyles.passwordContainer}>
                <TextInput
                  style={loginStyles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={loginStyles.eyeIcon}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Text style={loginStyles.eyeText}>
                    {isPasswordVisible ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={loginStyles.loginButton}
              onPress={handleLogin}
            >
              <Text style={loginStyles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={loginStyles.registerContainer}>
            <Text style={loginStyles.registerText}>No account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={loginStyles.registerLink}>Create account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
