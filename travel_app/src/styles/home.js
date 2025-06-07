// styles/HomeStyles.js
import { StyleSheet } from "react-native";
import { theme } from "../styles/theme";

export const homeStyles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.xlarge,
    fontWeight: theme.fonts.weight.bold,
  },

  subGreeting: {
    color: theme.colors.transparent.white80,
    fontSize: theme.fonts.size.medium,
    marginTop: 2,
  },

  logoutButton: {
    backgroundColor: theme.colors.transparent.white20,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
    borderRadius: theme.spacing.md,
  },

  logoutText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.medium,
    fontWeight: theme.fonts.weight.medium,
  },

  scrollContainer: {
    flex: 1,
  },

  searchContainer: {
    flexDirection: "row",
    margin: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xlarge,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
    ...theme.shadows.medium,
  },

  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fonts.size.regular,
  },

  searchButton: {
    padding: theme.spacing.sm,
  },

  searchButtonText: {
    fontSize: theme.fonts.size.large,
  },

  section: {
    marginBottom: theme.spacing.xl,
  },

  categoriesContainer: {
    paddingLeft: theme.spacing.lg,
  },

  categoryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginRight: theme.spacing.md,
    alignItems: "center",
    minWidth: 80,
    ...theme.shadows.small,
  },

  categoryIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },

  categoryName: {
    fontSize: theme.fonts.size.small,
    color: theme.colors.text.secondary,
    textAlign: "center",
  },

  destinationCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    marginLeft: theme.spacing.lg,
    marginRight: theme.spacing.xs,
    width: 160,
    ...theme.shadows.medium,
  },

  destinationImage: {
    height: 100,
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: theme.borderRadius.medium,
    borderTopRightRadius: theme.borderRadius.medium,
    justifyContent: "center",
    alignItems: "center",
  },

  destinationEmoji: {
    fontSize: 40,
  },

  destinationInfo: {
    padding: theme.spacing.sm,
  },

  destinationName: {
    fontSize: theme.fonts.size.regular,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  ratingContainer: {
    marginBottom: theme.spacing.xs,
  },

  rating: {
    fontSize: theme.fonts.size.small,
    color: theme.colors.text.secondary,
  },

  price: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.primary,
    fontWeight: theme.fonts.weight.semibold,
  },

  promoCard: {
    backgroundColor: theme.colors.promo.background,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: "center",
  },

  promoTitle: {
    fontSize: theme.fonts.size.large,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },

  promoSubtitle: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.promo.text,
    marginBottom: theme.spacing.md,
  },

  promoButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.spacing.lg,
  },

  promoButtonText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.medium,
    fontWeight: theme.fonts.weight.bold,
  },
});
