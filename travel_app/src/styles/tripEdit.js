import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const colors = {
  primary: "#6366F1", // Indigo
  primaryLight: "#A5B4FC",
  primaryDark: "#4338CA",
  secondary: "#F59E0B", // Amber
  success: "#10B981", // Emerald
  danger: "#EF4444", // Red
  warning: "#F59E0B",

  // Backgrounds
  background: "#FAFBFF",
  cardBackground: "#FFFFFF",
  surfaceLight: "#F8FAFC",
  surfaceDark: "#F1F5F9",

  // Text
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  textTertiary: "#94A3B8",
  textLight: "#CBD5E1",

  // Borders & Dividers
  border: "#E2E8F0",
  borderLight: "#F1F5F9",

  // Shadows
  shadow: "rgba(99, 102, 241, 0.1)",
  shadowDark: "rgba(0, 0, 0, 0.1)",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const tripEditorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header Section
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
  },
  headerContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primaryLight,
    textAlign: "center",
    opacity: 0.9,
  },

  // Main Content
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },

  // Search Section
  searchSection: {
    marginTop: -spacing.xxl,
    marginBottom: spacing.xl,
    zIndex: 10,
  },
  searchCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderColor: "transparent",
  },
  searchInputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.cardBackground,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
  },
  clearButton: {
    padding: spacing.xs,
  },

  // Search Results
  searchResults: {
    marginTop: spacing.md,
    maxHeight: 250,
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    marginVertical: 2,
  },
  searchResultContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 2,
  },
  searchResultDesc: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  addButton: {
    backgroundColor: colors.success,
    borderRadius: borderRadius.full,
    padding: spacing.sm,
    ...shadows.sm,
  },

  // Section Cards
  sectionCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minWidth: 28,
    alignItems: "center",
  },
  badgeText: {
    color: colors.cardBackground,
    fontSize: 12,
    fontWeight: "700",
  },

  // Empty States
  emptyState: {
    alignItems: "center",
    paddingVertical: spacing.xxxl,
  },
  emptyIcon: {
    marginBottom: spacing.lg,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textTertiary,
    textAlign: "center",
  },

  // Added Places
  addedPlacesList: {
    maxHeight: 400,
  },
  addedPlaceItem: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    ...shadows.sm,
  },
  placeHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  placeContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 2,
  },
  placeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  placeActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editNotesButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.full,
    padding: spacing.sm,
    marginRight: spacing.sm,
    ...shadows.sm,
  },
  removeButton: {
    backgroundColor: colors.danger,
    borderRadius: borderRadius.full,
    padding: spacing.sm,
    ...shadows.sm,
  },
  placeNotesContainer: {
    marginTop: spacing.sm,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeNotesInput: {
    fontSize: 14,
    color: colors.textPrimary,
    minHeight: 60,
    textAlignVertical: "top",
  },
  placeNotesDisplay: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: "italic",
    lineHeight: 20,
  },
  placeNotesLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textTertiary,
    marginBottom: spacing.xs,
  },
  saveNotesButton: {
    backgroundColor: colors.success,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: "flex-end",
    marginTop: spacing.sm,
  },
  saveNotesText: {
    color: colors.cardBackground,
    fontSize: 12,
    fontWeight: "600",
  },
  editingIndicator: {
    borderColor: colors.secondary,
    borderWidth: 2,
  },

  // Notes Section
  notesInputContainer: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: "transparent",
  },
  notesInputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.cardBackground,
  },
  notesInput: {
    minHeight: 120,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: 16,
    color: colors.textPrimary,
    textAlignVertical: "top",
  },
  notesPlaceholder: {
    position: "absolute",
    top: spacing.lg,
    left: spacing.lg,
    fontSize: 16,
    color: colors.textTertiary,
    pointerEvents: "none",
  },

  // Save Button
  saveButtonContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    backgroundColor: colors.background,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...shadows.lg,
  },
  saveButtonDisabled: {
    backgroundColor: colors.textTertiary,
    ...shadows.sm,
  },
  saveButtonIcon: {
    marginRight: spacing.sm,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.cardBackground,
  },

  // Loading
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.lg,
  },
  loadingText: {
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.textSecondary,
  },

  // Animations
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0.5,
  },

  mapContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },


  mapToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  mapToggleText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  }
});

