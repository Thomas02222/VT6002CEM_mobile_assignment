import { StyleSheet, Dimensions } from "react-native";

export const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  background: "#ffffff",
  surface: "#f8f9fa",
  text: "#333333",
  textSecondary: "#666666",
  border: "#e0e0e0",
  error: "#dc3545",
  success: "#28a745",
  warning: "#ffc107",
};

const { width } = Dimensions.get("window");

export const tripEditorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "500",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 5,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 5,
  },

  locationCount: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "500",
  },

  mapContainer: {
    height: 400,
    marginVertical: 15,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  locationsList: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 15,
    paddingLeft: 5,
  },

  locationItem: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  locationNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    backgroundColor: colors.primary + "20",
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: "center",
    lineHeight: 32,
    marginRight: 12,
  },

  locationInfo: {
    flex: 1,
  },

  locationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    lineHeight: 22,
  },

  locationDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 8,
    marginLeft: 44,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },

  emptyStateText: {
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
    marginTop: 20,
  },

  emptyStateIcon: {
    fontSize: 48,
    color: "#cccccc",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: "center",
    marginTop: 15,
    lineHeight: 24,
  },

  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },

  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 8,
  },

  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },

  // 分隔線
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 15,
  },

  // 你新增的樣式（已修正）
  editButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 15,
  },

  editButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  metaInfo: {
    alignItems: "center",
    marginTop: 10,
  },

  locationCategory: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: 3,
  },

  notesContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },

  notesLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 4,
  },

  notesText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },

  placeNotesInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.background,
    marginBottom: 15,
  },

  addedPlacesList: {
    marginTop: 20,
  },

  placeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 20,
  },

  saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  ...(width < 375 && {
    title: {
      fontSize: 24,
    },
    locationNumber: {
      width: 28,
      height: 28,
      borderRadius: 14,
      fontSize: 16,
      lineHeight: 28,
    },
  }),
});

export const tripViewStyles = tripEditorStyles;
