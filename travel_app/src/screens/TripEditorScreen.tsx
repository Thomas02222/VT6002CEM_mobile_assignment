import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tripEditorStyles as styles, colors } from "../styles/tripEdit";
import { db } from "../firebase/firebase";
import { ref, push } from "firebase/database";
import { useAuth } from "../context/AuthContext";

interface Place {
  id: string;
  name: string;
  description?: string;
  category?: string;
  notes?: string;
}

const TripEditorScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [addedPlaces, setAddedPlaces] = useState<Place[]>([]);
  const [notes, setNotes] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notesFocused, setNotesFocused] = useState(false);
  const [editingPlaceId, setEditingPlaceId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>("");
  const { user } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef<TextInput>(null);
  const notesInputRef = useRef<TextInput>(null);
  const [tripName, setTripName] = useState("My Awesome Trip");
  const [tripNameFocused, setTripNameFocused] = useState(false);
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const searchPlaces = useCallback(async (query: string) => {
    if (query.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);

      const res = await fetch(
        `http://192.168.1.4:4000/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      const places: Place[] = (data.data || []).map((item: any) => ({
        id: item.location_id,
        name: item.name,
        description: item.address_obj?.address_string || "",
        category: item.result_type || "Unknown",
      }));

      setSearchResults(places);
    } catch (error) {
      console.error("Search API failed", error);
      Alert.alert("Search Error", "Failed to fetch search results.");
    } finally {
      setIsSearching(false);
    }
  }, []);
  

  useEffect(() => {
    searchPlaces(searchQuery);
  }, [searchQuery, searchPlaces]);

  const addPlace = useCallback(
    (place: Place) => {
      if (addedPlaces.find((p) => p.id === place.id)) {
        Alert.alert("Already Added", `${place.name} is already in your trip!`);
        return;
      }
      setAddedPlaces((prev) => [...prev, { ...place, notes: "" }]);
      setSearchQuery("");
      searchInputRef.current?.blur();
    },
    [addedPlaces]
  );

  const updatePlaceNotes = useCallback((placeId: string, newNotes: string) => {
    setAddedPlaces((prev) =>
      prev.map((place) =>
        place.id === placeId ? { ...place, notes: newNotes } : place
      )
    );
  }, []);

  const startEditingNotes = useCallback((place: Place) => {
    setEditingPlaceId(place.id);
    setTempNotes(place.notes || "");
  }, []);

  const saveNotes = useCallback(
    (placeId: string) => {
      updatePlaceNotes(placeId, tempNotes);
      setEditingPlaceId(null);
      setTempNotes("");
    },
    [tempNotes, updatePlaceNotes]
  );

  const cancelEditingNotes = useCallback(() => {
    setEditingPlaceId(null);
    setTempNotes("");
  }, []);

  const removePlace = useCallback((placeId: string) => {
    Alert.alert(
      "Remove Place",
      "Are you sure you want to remove this place from your trip?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setAddedPlaces((prev) => prev.filter((p) => p.id !== placeId));
          },
        },
      ]
    );
  }, []);

  const handleSave = useCallback(async () => {
    if (addedPlaces.length === 0) {
      Alert.alert(
        "No Places Added",
        "Please add at least one place to your trip!"
      );
      return;
    }

    try {
      const newTrip = {
        userId: user?.uid || "guest",
        createdAt: new Date().toISOString(),
        title: tripName.trim(),
        notes: notes.trim(),
        places: addedPlaces.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description || "",
          category: p.category || "",
          notes: p.notes || "",
        })),
      };

      const tripRef = ref(db, `trips/${user?.uid}`);
      await push(tripRef, newTrip); 

      Alert.alert("Trip Saved", "Your trip plan has been saved to Firebase!");
    } catch (error) {
      console.error("Firebase Save Error:", error);
      Alert.alert("Save Failed", "There was an error saving your trip.");
    }
  }, [addedPlaces, notes, user]);
  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.blur();
  };

  const renderSearchItem = ({ item }: { item: Place }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => addPlace(item)}
      activeOpacity={0.7}
    >
      <View style={styles.searchResultContent}>
        <Text style={styles.searchResultName}>{item.name}</Text>
        <Text style={styles.searchResultDesc}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => addPlace(item)}>
        <Ionicons name="add" size={20} color={colors.cardBackground} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderAddedItem = ({ item }: { item: Place }) => {
    const isEditing = editingPlaceId === item.id;

    return (
      <View
        style={[styles.addedPlaceItem, isEditing && styles.editingIndicator]}
      >
        <View style={styles.placeHeader}>
          <View style={styles.placeContent}>
            <Text style={styles.placeName}>{item.name}</Text>
            <Text style={styles.placeDescription}>{item.description}</Text>
          </View>
          <View style={styles.placeActions}>
            <TouchableOpacity
              style={styles.editNotesButton}
              onPress={() => startEditingNotes(item)}
            >
              <Ionicons name="create" size={16} color={colors.cardBackground} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removePlace(item.id)}
            >
              <Ionicons name="close" size={16} color={colors.cardBackground} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notes Section */}
        <View style={styles.placeNotesContainer}>
          <Text style={styles.placeNotesLabel}>
            {isEditing ? "Editing Notes" : "Personal Notes"}
          </Text>

          {isEditing ? (
            <>
              <TextInput
                style={styles.placeNotesInput}
                multiline
                value={tempNotes}
                onChangeText={setTempNotes}
                placeholder="Add your personal notes for this place..."
                placeholderTextColor={colors.textTertiary}
                textAlignVertical="top"
                autoFocus
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 8,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.saveNotesButton,
                    { backgroundColor: colors.textTertiary },
                  ]}
                  onPress={cancelEditingNotes}
                >
                  <Text style={styles.saveNotesText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveNotesButton}
                  onPress={() => saveNotes(item.id)}
                >
                  <Text style={styles.saveNotesText}>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {item.notes && item.notes.trim().length > 0 ? (
                <Text style={styles.placeNotesDisplay}>{item.notes}</Text>
              ) : (
                <Text style={[styles.placeNotesDisplay, { opacity: 0.6 }]}>
                  Tap the edit button to add personal notes for this place...
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.headerContent}>
          <TextInput
            style={[
              styles.title,
              tripNameFocused && {
                borderBottomWidth: 1,
                borderBottomColor: colors.textLight,
              },
            ]}
            value={tripName}
            onChangeText={setTripName}
            onFocus={() => setTripNameFocused(true)}
            onBlur={() => setTripNameFocused(false)}
            placeholder="Enter your trip name"
            placeholderTextColor={colors.textTertiary}
          />
          <Text style={styles.subtitle}>Plan your perfect adventure</Text>
        </View>

        {/* Main Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Search Section */}
          <View style={styles.searchSection}>
            <View style={styles.searchCard}>
              <View
                style={[
                  styles.searchInputContainer,
                  searchFocused && styles.searchInputFocused,
                ]}
              >
                <Ionicons
                  name="search"
                  size={20}
                  color={searchFocused ? colors.primary : colors.textTertiary}
                  style={styles.searchIcon}
                />
                <TextInput
                  ref={searchInputRef}
                  style={styles.searchInput}
                  placeholder="Where do you want to go?"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  returnKeyType="search"
                  placeholderTextColor={colors.textTertiary}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearSearch}
                  >
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color={colors.textTertiary}
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/* Search Results */}
              {isSearching && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text style={styles.loadingText}>
                    Searching amazing places...
                  </Text>
                </View>
              )}

              {searchResults.length > 0 && !isSearching && (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item.id}
                  style={styles.searchResults}
                  renderItem={renderSearchItem}
                  scrollEnabled={false}
                  keyboardShouldPersistTaps="handled"
                />
              )}
            </View>
          </View>

          {/* Added Places Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Destinations</Text>
              {addedPlaces.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{addedPlaces.length}</Text>
                </View>
              )}
            </View>

            {addedPlaces.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons
                  name="location-outline"
                  size={64}
                  color={colors.textLight}
                  style={styles.emptyIcon}
                />
                <Text style={styles.emptyTitle}>No destinations yet</Text>
                <Text style={styles.emptySubtitle}>
                  Search and add places above to start planning your trip
                </Text>
              </View>
            ) : (
              <FlatList
                data={addedPlaces}
                keyExtractor={(item) => item.id}
                style={styles.addedPlacesList}
                renderItem={renderAddedItem}
                scrollEnabled={false}
              />
            )}
          </View>

          {/* Notes Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}> General Trip Notes</Text>
            <View
              style={[
                styles.notesInputContainer,
                notesFocused && styles.notesInputFocused,
              ]}
            >
              <TextInput
                ref={notesInputRef}
                style={styles.notesInput}
                multiline
                value={notes}
                onChangeText={setNotes}
                onFocus={() => setNotesFocused(true)}
                onBlur={() => setNotesFocused(false)}
                textAlignVertical="top"
                placeholder=""
              />
              {notes.length === 0 && !notesFocused && (
                <Text style={styles.notesPlaceholder}>
                  Add general trip notes, packing lists, or travel reminders
                  here...
                </Text>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              addedPlaces.length === 0 && styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={addedPlaces.length === 0}
          >
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={colors.cardBackground}
              style={styles.saveButtonIcon}
            />
            <Text style={styles.saveButtonText}>Save My Trip</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default TripEditorScreen;
