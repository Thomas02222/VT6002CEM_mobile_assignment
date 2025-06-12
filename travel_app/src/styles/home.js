import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  travelContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },


  travelHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    zIndex: 10,
  },
  travelHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  travelUserInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  travelAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  travelGreeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  travelSubGreeting: {
    fontSize: 14,
    color: "#6b7280",
  },
  travelHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  travelIconButton: {
    marginLeft: 16,
  },


  travelMainContent: {
    paddingHorizontal: 20,

  },


  travelSearchContainer: {
    marginBottom: 20,
    position: "relative",
  },
  travelSearchInput: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 10,
    paddingLeft: 44,
    paddingRight: 16,
    fontSize: 16,
    color: "#111827",
  },


  travelSectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    marginTop: 20,
  },


  travelCategoriesContainer: {
    flexDirection: "row",
  },
  travelCategoryCard: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  travelCategoryName: {
    fontWeight: "600",
    fontSize: 16,
  },

  travelDestinationsContainer: {
    flexDirection: "row",
  },
  travelDestinationCard: {
    width: 160,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f9fafb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  travelDestinationImage: {
    width: "100%",
    height: 100,
  },
  travelDestinationInfo: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  travelDestinationName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  travelDestinationPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    marginTop: 4,
  },


  travelPostCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  travelPostHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  travelPostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  travelPostAuthor: {
    fontWeight: "700",
    fontSize: 16,
    color: "#111827",
  },
  travelPostTime: {
    fontSize: 12,
    color: "#9ca3af",
  },
  travelPostBookmark: {
    marginLeft: "auto",
  },

  travelPostDestination: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: 4,
  },
  travelPostTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  travelPostDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  travelPostImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },

  travelPostInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  travelPostInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, 
  },
  travelPostInfoText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#6b7280",
  },


  travelPostTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6, 
    marginBottom: 12,
  },
  travelPostTag: {
    backgroundColor: "#e0e7ff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  travelPostTagText: {
    color: "#4338ca",
    fontWeight: "600",
    fontSize: 12,
  },

  travelPostActions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 24,
  },
  travelPostActionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  travelPostActionText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#6b7280",
  },

  bottomNavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    paddingBottom: 5,
  },

  bottomNavItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  bottomNavText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
});
