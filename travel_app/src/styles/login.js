// styles/login.js
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "./theme";

const { width } = Dimensions.get("window");

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#667eea",
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxl,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: theme.spacing.xxxl,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },

  logoIcon: {
    fontSize: 32,
  },

  logoText: {
    fontSize: theme.fonts.size.xxxlarge,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
  },

  logoSubtext: {
    fontSize: theme.fonts.size.regular,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },

  formContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xlarge,
    padding: theme.spacing.xxl,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.medium,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  formTitle: {
    fontSize: theme.fonts.size.xxlarge,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.xxl,
  },

  inputContainer: {
    marginBottom: theme.spacing.lg,
  },

  inputLabel: {
    fontSize: theme.fonts.size.medium,
    fontWeight: theme.fonts.weight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  input: {
    backgroundColor: theme.colors.gray.light,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fonts.size.regular,
    color: theme.colors.text.primary,
    borderWidth: 1,
    borderColor: theme.colors.gray.border,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.gray.light,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.gray.border,
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fonts.size.regular,
    color: theme.colors.text.primary,
  },

  eyeIcon: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },

  eyeText: {
    fontSize: 18,
  },

  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: theme.spacing.xl,
  },

  forgotPasswordText: {
    color: "#667eea",
    fontSize: theme.fonts.size.medium,
    fontWeight: theme.fonts.weight.medium,
  },

  loginButton: {
    backgroundColor: "#667eea",
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.lg,
    alignItems: "center",
    ...theme.shadows.small,
    shadowColor: "#667eea",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  loginButtonText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.large,
    fontWeight: theme.fonts.weight.bold,
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.lg,
  },

  registerText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: theme.fonts.size.medium,
  },

  registerLink: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.medium,
    fontWeight: theme.fonts.weight.bold,
    textDecorationLine: "underline",
  },
});
