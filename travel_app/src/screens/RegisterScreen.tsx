import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
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
import { registerStyles } from "../styles/register";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const { register } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }

    // if (!agreedToTerms) {
    //   Alert.alert("Error", "Please agree to the Terms and Conditions");
    //   return false;
    // }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );
      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      const err = error as Error;
      Alert.alert("Registration Failed", err.message);
    }
  };

  return (
    <SafeAreaView style={registerStyles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={registerStyles.container.backgroundColor}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={registerStyles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={registerStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={registerStyles.headerContainer}>
            <View style={registerStyles.logoCircle}></View>
            <Text style={registerStyles.headerTitle}>Create Account</Text>
            <Text style={registerStyles.headerSubtext}>
              Join us today and get started
            </Text>
          </View>

          {/* Form Container */}
          <View style={registerStyles.formContainer}>
            <Text style={registerStyles.formTitle}>Sign Up</Text>

            {/* Name Fields Row */}
            <View style={registerStyles.nameRow}>
              <View style={registerStyles.nameFieldContainer}>
                <Text style={registerStyles.inputLabel}>First Name</Text>
                <TextInput
                  style={registerStyles.input}
                  placeholder="John"
                  placeholderTextColor="#999"
                  value={formData.firstName}
                  onChangeText={(value) =>
                    handleInputChange("firstName", value)
                  }
                  autoCapitalize="words"
                />
              </View>

              <View style={registerStyles.nameFieldContainer}>
                <Text style={registerStyles.inputLabel}>Last Name</Text>
                <TextInput
                  style={registerStyles.input}
                  placeholder="Doe"
                  placeholderTextColor="#999"
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange("lastName", value)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email Field */}
            <View style={registerStyles.inputContainer}>
              <Text style={registerStyles.inputLabel}>Email Address</Text>
              <TextInput
                style={registerStyles.input}
                placeholder="john.doe@example.com"
                placeholderTextColor="#999"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Field */}
            <View style={registerStyles.inputContainer}>
              <Text style={registerStyles.inputLabel}>Password</Text>
              <View style={registerStyles.passwordContainer}>
                <TextInput
                  style={registerStyles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={registerStyles.eyeIcon}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Text style={registerStyles.eyeText}></Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Field */}
            <View style={registerStyles.inputContainer}>
              <Text style={registerStyles.inputLabel}>Confirm Password</Text>
              <View style={registerStyles.passwordContainer}>
                <TextInput
                  style={registerStyles.passwordInput}
                  placeholder="Confirm your password"
                  placeholderTextColor="#999"
                  value={formData.confirmPassword}
                  onChangeText={(value) =>
                    handleInputChange("confirmPassword", value)
                  }
                  secureTextEntry={!isConfirmPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={registerStyles.eyeIcon}
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                >
                  <Text style={registerStyles.eyeText}>
                    {/* {isConfirmPasswordVisible ? } */}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[registerStyles.registerButton]}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={registerStyles.registerButtonText}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={registerStyles.loginContainer}>
            <Text style={registerStyles.loginText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={registerStyles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
