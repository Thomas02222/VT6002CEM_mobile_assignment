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

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("error", "please input all field");
      return;
    }

    try {
      await login(email, password);
      Alert.alert("sucess", "sucessfully login");
    } catch (error: any) {
      Alert.alert("login fail", error.message);
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
        <ScrollView
          contentContainerStyle={loginStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={loginStyles.logoContainer}>
            <View style={loginStyles.logoCircle}>
              {/* <Text style={loginStyles.logoIcon}></Text> */}
            </View>
            <Text style={loginStyles.logoText}>Welcome back</Text>
            <Text style={loginStyles.logoSubtext}>
              Please input your email and password
            </Text>
          </View>

          <View style={loginStyles.formContainer}>
            <Text style={loginStyles.formTitle}>Login</Text>

            {/* Email input */}
            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.inputLabel}>email</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="Please input your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password input */}
            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.inputLabel}>password</Text>
              <View style={loginStyles.passwordContainer}>
                <TextInput
                  style={loginStyles.passwordInput}
                  placeholder="Please input your password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={loginStyles.eyeIcon}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Text style={loginStyles.eyeText}>
                    {/* {isPasswordVisible ?} */}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* forget password button */}
            <TouchableOpacity style={loginStyles.forgotPassword}>
              <Text style={loginStyles.forgotPasswordText}>
                forget password？
              </Text>
            </TouchableOpacity>

            {/* login button */}
            <TouchableOpacity
              style={loginStyles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={loginStyles.loginButtonText}>login</Text>
            </TouchableOpacity>
          </View>

          {/* register */}
          <View style={loginStyles.registerContainer}>
            <Text style={loginStyles.registerText}>no account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={loginStyles.registerLink}>create account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
