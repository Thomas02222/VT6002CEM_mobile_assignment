// styles/CommonStyles.js
import { StyleSheet } from "react-native";
import { theme } from "../styles/theme";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  input: {
    backgroundColor: theme.colors.gray.light,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontSize: theme.fonts.size.regular,
    borderWidth: 1,
    borderColor: theme.colors.gray.border,
  },

  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.md,
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },

  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.large,
    fontWeight: theme.fonts.weight.bold,
  },

  sectionTitle: {
    fontSize: theme.fonts.size.xlarge,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },

  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.medium,
  },

  cardSmall: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.small,
  },
});
