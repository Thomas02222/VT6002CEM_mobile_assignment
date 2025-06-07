export const theme = {
  colors: {
    primary: "#4A90E2",
    secondary: "#D2691E",
    background: "#f5f5f5",
    white: "#ffffff",
    black: "#000000",
    gray: {
      light: "#f8f8f8",
      medium: "#999999",
      dark: "#666666",
      border: "#e0e0e0",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
      light: "#999999",
    },
    promo: {
      background: "#FFE4B5",
      text: "#8B4513",
    },
    transparent: {
      white20: "rgba(255,255,255,0.2)",
      white80: "rgba(255,255,255,0.8)",
      black10: "rgba(0,0,0,0.1)",
    },
  },

  fonts: {
    size: {
      small: 12,
      medium: 14,
      regular: 16,
      large: 18,
      xlarge: 20,
      xxlarge: 24,
      xxxlarge: 36,
    },
    weight: {
      normal: "normal",
      medium: "500",
      semibold: "600",
      bold: "bold",
    },
  },

  spacing: {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 25,
    xxl: 30,
    xxxl: 50,
  },

  borderRadius: {
    small: 10,
    medium: 15,
    large: 20,
    xlarge: 25,
  },

  shadows: {
    small: {
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    medium: {
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  },
};
export const buttonStyles = {
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: "center",
    marginTop: theme.spacing.md,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.medium,
    fontWeight: theme.fonts.weight.bold,
  },
};
