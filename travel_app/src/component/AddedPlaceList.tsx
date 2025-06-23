import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tripEditorStyles as styles, colors } from "../styles/tripEdit";
import { Place } from "../types/place";

interface Props {
  addedPlaces: Place[];
  onUpdateNotes: (placeId: string, newNotes: string) => void;
  onRemovePlace: (placeId: string) => void;
}

const AddedPlaceList: React.FC<Props> = ({
  addedPlaces,
  onUpdateNotes,
  onRemovePlace,
}) => {
  const [editingPlaceId, setEditingPlaceId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>("");

  const startEditing = (place: Place) => {
    setEditingPlaceId(place.id);
    setTempNotes(place.notes || "");
  };

  const saveNotes = (placeId: string) => {
    onUpdateNotes(placeId, tempNotes);
    setEditingPlaceId(null);
    setTempNotes("");
  };

  const cancelEditing = () => {
    setEditingPlaceId(null);
    setTempNotes("");
  };

  const renderItem = ({ item }: { item: Place }) => (
    <View style={styles.emptyState}>
      <View style={styles.placeHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.emptyTitle}>{item.name}</Text>
          <Text style={styles.emptySubtitle}>{item.description}</Text>
        </View>

        <TouchableOpacity onPress={() => onRemovePlace(item.id)}>
          <Ionicons name="trash" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>

      {editingPlaceId === item.id ? (
        <View style={styles.notesInputContainer}>
          <TextInput
            value={tempNotes}
            onChangeText={setTempNotes}
            placeholder="Add notes..."
            style={styles.notesInput}
            multiline
          />
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity onPress={() => saveNotes(item.id)}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelEditing}>
              <Text style={styles.clearButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={() => startEditing(item)}>
          <Text style={styles.notesInput}>
            {item.notes ? item.notes : "Add notes..."}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <FlatList
      data={addedPlaces}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={
        <Text style={{ color: colors.textLight, padding: 12 }}>
          No places added yet.
        </Text>
      }
    />
  );
};

export default AddedPlaceList;
