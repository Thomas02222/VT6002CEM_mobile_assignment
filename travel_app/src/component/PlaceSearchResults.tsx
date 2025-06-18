import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Place } from "../types/place";
import { tripEditorStyles as styles, colors } from "../styles/tripEdit";

interface Props {
  results: Place[];
  onAddPlace: (place: Place) => void;
}

const PlaceSearchResults: React.FC<Props> = ({ results, onAddPlace }) => {
  if (!results || results.length === 0) return null;

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.searchResultItem}>
          <View style={styles.searchResultContent}>
            <Text style={styles.searchResultName}>{item.name}</Text>
            <Text style={styles.searchResultDesc}>{item.description}</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddPlace(item)}
          >
            <Ionicons name="add" size={20} color={colors.cardBackground} />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default PlaceSearchResults;
