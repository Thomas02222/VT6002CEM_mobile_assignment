// components/PlaceItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Place } from "../types/place";
import { tripEditorStyles as styles, colors } from "../styles/tripEdit";

interface Props {
  place: Place;
  onEdit: () => void;
  onRemove: () => void;
}

const PlaceItem: React.FC<Props> = ({ place, onEdit, onRemove }) => (
  <View style={styles.addedPlaceItem}>
    <View style={styles.placeContent}>
      <Text style={styles.placeName}>{place.name}</Text>
      <Text style={styles.placeDescription}>{place.description}</Text>
    </View>
    <View style={styles.placeActions}>
      <TouchableOpacity onPress={onEdit}>
        <Ionicons name="create" size={18} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemove}>
        <Ionicons name="trash" size={18} color={colors.danger} />
      </TouchableOpacity>
    </View>
  </View>
);

export default PlaceItem;
