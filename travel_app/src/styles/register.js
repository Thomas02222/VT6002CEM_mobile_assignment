// styles/register.js
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "./theme";

const { width } = Dimensions.get("window");

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#764ba2",
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },

  // Header
  headerContainer: {
    alignItems: "center",
    marginBottom: theme.spacing.xxl,
  },

  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },

  logoIcon: {
    fontSize: 28,
  },

  headerTitle: {
    fontSize: theme.fonts.size.xxlarge,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
  },

  headerSubtext: {
    fontSize: theme.fonts.size.regular,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },

  formContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xlarge,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
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
    fontSize: theme.fonts.size.xlarge,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },

  // name
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },

  nameFieldContainer: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },

  // textbox
  inputContainer: {
    marginBottom: theme.spacing.md,
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

  // password
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
    fontSize: 16,
  },

  // checkbox
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xs,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#764ba2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
    marginTop: 2,
  },

  checkboxText: {
    color: "#764ba2",
    fontSize: 12,
    fontWeight: theme.fonts.weight.bold,
  },

  termsTextContainer: {
    flex: 1,
  },

  termsText: {
    fontSize: theme.fonts.size.small,
    color: theme.colors.text.secondary,
    lineHeight: 18,
  },

  termsLink: {
    color: "#764ba2",
    fontWeight: theme.fonts.weight.medium,
    textDecorationLine: "underline",
  },

  // registerButton
  registerButton: {
    backgroundColor: "#764ba2",
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.lg,
    alignItems: "center",
    ...theme.shadows.small,
    shadowColor: "#764ba2",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  disabledButton: {
    backgroundColor: theme.colors.gray.medium,
    shadowOpacity: 0,
    elevation: 0,
  },

  registerButtonText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.large,
    fontWeight: theme.fonts.weight.bold,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.md,
  },

  loginText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: theme.fonts.size.medium,
  },

  loginLink: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.medium,
    fontWeight: theme.fonts.weight.bold,
    textDecorationLine: "underline",
  },
});
