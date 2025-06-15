import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  SectionList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tripEditorStyles as styles, colors } from "../styles/tripEdit";
import { db } from "../firebase/firebase";
import { onValue, ref, push, set } from "firebase/database";
import { useAuth } from "../context/AuthContext";
import MapComponent from "../component/Map";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { Place } from "../types/place";

type TripEditorRouteProp = RouteProp<RootStackParamList, "TripEditor">;

interface SectionData {
  title: string;
  key: string;
  data: any[];
  renderItem: (item: any) => React.ReactElement;
}

const TripEditorScreen: React.FC = () => {
  const route = useRoute<TripEditorRouteProp>();
  const { tripId } = route.params || {};

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [addedPlaces, setAddedPlaces] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [editingPlaceId, setEditingPlaceId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>("");
  const [showMap, setShowMap] = useState(false);
  const { user } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef<TextInput>(null);
  const [tripName, setTripName] = useState("");
  const [tripNameFocused, setTripNameFocused] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (tripId) {
      const tripRef = ref(db, `trips/${user?.uid}/${tripId}`);
      onValue(tripRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setTitle(data.title || "");
          setNotes(data.notes || "");
          setAddedPlaces(data.places || []);
        }
      });
    }
  }, [tripId]);

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

      if (!data.data || data.data.length === 0) {
        setSearchResults([]);
        return;
      }

      const placesWithCoordinates = await Promise.all(
        data.data.map(async (item: any) => {
          try {
            const detailRes = await fetch(
              `http://192.168.1.4:4000/detail?location_id=${item.location_id}`
            );
            const detailData = await detailRes.json();

            let lat = undefined;
            let lng = undefined;

            if (
              detailData.latitude !== undefined &&
              detailData.latitude !== null
            ) {
              lat = parseFloat(detailData.latitude);
            } else if (
              detailData.lat !== undefined &&
              detailData.lat !== null
            ) {
              lat = parseFloat(detailData.lat);
            } else if (
              detailData.geo_lat !== undefined &&
              detailData.geo_lat !== null
            ) {
              lat = parseFloat(detailData.geo_lat);
            } else if (detailData.location && detailData.location.lat) {
              lat = parseFloat(detailData.location.lat);
            }

            if (
              detailData.longitude !== undefined &&
              detailData.longitude !== null
            ) {
              lng = parseFloat(detailData.longitude);
            } else if (
              detailData.lng !== undefined &&
              detailData.lng !== null
            ) {
              lng = parseFloat(detailData.lng);
            } else if (
              detailData.geo_lng !== undefined &&
              detailData.geo_lng !== null
            ) {
              lng = parseFloat(detailData.geo_lng);
            } else if (detailData.location && detailData.location.lng) {
              lng = parseFloat(detailData.location.lng);
            }

            console.log(`${item.name}: lat=${lat}, lng=${lng}`);

            return {
              id: item.location_id,
              name: item.name,
              description: item.address_obj?.address_string || "",
              category: item.result_type || "Unknown",
              latitude: lat,
              longitude: lng,
              hasCoordinates:
                lat !== undefined &&
                lng !== undefined &&
                !isNaN(lat) &&
                !isNaN(lng),
            };
          } catch (error) {
            console.error(`Failed to fetch details for ${item.name}:`, error);
            return {
              id: item.location_id,
              name: item.name,
              description: item.address_obj?.address_string || "",
              category: item.result_type || "Unknown",
              latitude: undefined,
              longitude: undefined,
              hasCoordinates: false,
            };
          }
        })
      );
      setSearchResults(placesWithCoordinates);
    } catch (error) {
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
      const tripData = {
        userId: user?.uid || "guest",
        title: tripName.trim(),
        updatedAt: new Date().toISOString(),
        places: addedPlaces.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description || "",
          category: p.category || "",
          notes: p.notes || "",
          latitude: p.latitude,
          longitude: p.longitude,
        })),
      };

      const baseRef = ref(db, `trips/${user?.uid}`);

      if (tripId) {
        const specificTripRef = ref(db, `trips/${user?.uid}/${tripId}`);
        await set(specificTripRef, tripData);
        Alert.alert("Trip Updated", "Your trip has been updated!");
      } else {
        const newTripRef = push(baseRef);
        await set(newTripRef, {
          ...tripData,
          createdAt: new Date().toISOString(),
        });
        Alert.alert("Trip Saved", "Your trip plan has been saved to Firebase!");
      }
    } catch (error) {
      console.error("Firebase Save Error:", error);
      Alert.alert("Save Failed", "There was an error saving your trip.");
    }
  }, [addedPlaces, user, tripName, tripId]);

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.blur();
  };

  const handleMapLocationPress = (location: any) => {
    Alert.alert(location.title, location.description || "No description");
  };

  const handleMapPress = (coordinate: {
    latitude: number;
    longitude: number;
  }) => {
    Alert.alert(
      "Add Custom Location",
      `Add a custom location at this coordinate?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add",
          onPress: () => {
            const customPlace: Place = {
              id: `custom_${Date.now()}`,
              name: `Custom Location ${addedPlaces.length + 1}`,
              description: `Lat: ${coordinate.latitude.toFixed(
                4
              )}, Lng: ${coordinate.longitude.toFixed(4)}`,
              category: "Custom",
              notes: "",
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            };
            setAddedPlaces((prev) => [...prev, customPlace]);
          },
        },
      ]
    );
  };

  const renderSearchItem = (item: Place) => (
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

  const renderAddedItem = (item: Place) => {
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

  const getMapLocations = () => {
    const locations = addedPlaces
      .filter((place) => {
        return (
          place.latitude &&
          place.longitude &&
          !isNaN(place.latitude) &&
          !isNaN(place.longitude)
        );
      })
      .map((place) => ({
        id: place.id,
        title: place.name,
        latitude: place.latitude!,
        longitude: place.longitude!,
        description: place.description,
      }));
    return locations;
  };

  const sections: SectionData[] = [
    {
      title: "header",
      key: "header",
      data: [{}],
      renderItem: () => (
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
      ),
    },

    {
      title: "search",
      key: "search",
      data: [{}],
      renderItem: () => (
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
          </View>
        </View>
      ),
    },

    ...(searchResults.length > 0 && !isSearching
      ? [
          {
            title: "Search Results",
            key: "searchResults",
            data: searchResults,
            renderItem: ({ item }: { item: Place }) => renderSearchItem(item),
          },
        ]
      : []),

    // Added Places Section
    {
      title: "Your Destinations",
      key: "destinations",
      data: addedPlaces.length > 0 ? addedPlaces : [null], 
      renderItem: ({ item }: { item: Place | null }) => {
        if (item === null) {
          return (
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
          );
        }
        return renderAddedItem(item);
      },
    },

    {
      title: "mapToggle",
      key: "mapToggle",
      data: [{}],
      renderItem: () => (
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.mapToggleButton}
            onPress={() => setShowMap(!showMap)}
          >
            <Ionicons
              name={showMap ? "map" : "map-outline"}
              size={24}
              color={colors.primary}
            />
            <Text style={styles.mapToggleText}>
              {showMap ? "Hide Map" : "Show Map"}
            </Text>
            <Ionicons
              name={showMap ? "chevron-up" : "chevron-down"}
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        </View>
      ),
    },

    ...(showMap
      ? [
          {
            title: "map",
            key: "map",
            data: [{}],
            renderItem: () => {
              const locations = getMapLocations();
              console.log("Rendering map with locations:", locations);
              console.log("Show map:", showMap);

              return (
                <View style={styles.mapContainer}>
                  {locations.length === 0 ? (
                    <View style={styles.emptyState}>
                      <Text style={styles.emptyTitle}>
                        No locations with coordinates
                      </Text>
                      <Text style={styles.emptySubtitle}>
                        Add places with valid coordinates to see them on the map
                      </Text>
                    </View>
                  ) : (
                    <MapComponent
                      locations={locations}
                      onLocationPress={handleMapLocationPress}
                      onMapPress={handleMapPress}
                      showUserLocation={true}
                      style={{ height: 300, width: "100%" }}
                    />
                  )}
                </View>
              );
            },
          },
        ]
      : []),
  ];

  const renderSectionHeader = ({ section }: { section: SectionData }) => {
    if (
      section.key === "header" ||
      section.key === "search" ||
      section.key === "searchResults" ||
      section.key === "mapToggle" ||
      section.key === "map" ||
      section.key === "notes"
    ) {
      return null;
    }

    return (
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.key === "destinations" && addedPlaces.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{addedPlaces.length}</Text>
            </View>
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
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, section }) => section.renderItem({ item })}
          renderSectionHeader={renderSectionHeader}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 100 }}
        />

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
