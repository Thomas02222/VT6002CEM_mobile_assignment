import React from "react";
import { View, TextInput, Text } from "react-native";
import { tripEditorStyles as styles, colors } from "../styles/tripEdit";

interface TripTitleInputProps {
  tripName: string;
  setTripName: (value: string) => void;
}

const TripTitleInput: React.FC<TripTitleInputProps> = ({
  tripName,
  setTripName,
}) => {
  return (
    <View style={styles.headerContent}>
      <Text style={styles.title}>Trip Name</Text>
      <TextInput
        placeholder="Enter your trip name..."
        value={tripName}
        onChangeText={setTripName}
        returnKeyType="done"
      />
    </View>
  );
};

export default TripTitleInput;


