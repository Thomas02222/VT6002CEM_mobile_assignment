// navigation/MainStackNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import { RootStackParamList } from "../types/navigation";
import TripEditorScreen from "../screens/TripEditorScreen";
import TripViewScreen from "../screens/TripViewScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={{ title: "Attraction Detail" }}
      />
      <Stack.Screen
        name="TripEditor"
        component={TripEditorScreen}
        options={{ title: "Edit Trip" }}
      />
      <Stack.Screen
        name="TripView"
        component={TripViewScreen}
        options={{ title: "View Trip" }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
