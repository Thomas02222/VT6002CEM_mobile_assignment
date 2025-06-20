import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { db } from "../firebase/firebase";
import { ref, push, get, set } from "firebase/database";
import { useAuth } from "../context/AuthContext";
import PlaceSearchBar from "../component/PlaceSearchBar";
import AddedPlaceList from "../component/AddedPlaceList";
import { Place } from "../types/place";
import { tripEditorStyles as styles, colors } from "../styles/tripEdit";

const TripEditorScreen = () => {
  const { user } = useAuth();
  const [tripName, setTripName] = useState("");
  const [tripId, setTripId] = useState<string | null>(null);
  const [addedPlaces, setAddedPlaces] = useState<Place[]>([]);

  const [fetchedPlaceIds, setFetchedPlaceIds] = useState<Set<string>>(
    new Set()
  );

  const addPlace = async (place: Place) => {
    if (addedPlaces.find((p) => p.id === place.id)) return;
    if (fetchedPlaceIds.has(place.id)) return;

    try {
      const detailRes = await fetch(
        `http://192.168.1.4:4000/detail?location_id=${place.id}`
      );
      const detailData = await detailRes.json();

      const lat = parseFloat(
        detailData.latitude ??
          detailData.lat ??
          detailData.geo_lat ??
          detailData.location?.lat ??
          ""
      );
      const lng = parseFloat(
        detailData.longitude ??
          detailData.lng ??
          detailData.geo_lng ??
          detailData.location?.lng ??
          ""
      );

      if (isNaN(lat) || isNaN(lng)) {
        Alert.alert("Missing Location", "This place has no location info.");
        return;
      }

      setAddedPlaces([
        ...addedPlaces,
        {
          ...place,
          latitude: lat,
          longitude: lng,
          notes: "",
        },
      ]);

 
      setFetchedPlaceIds((prev) => new Set(prev).add(place.id));
    } catch (err) {
      Alert.alert("Failed", "Unable to fetch place details.");
    }
  };

  const removePlace = (placeId: string) => {
    Alert.alert("Confirm delete", "Remove this place?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          setAddedPlaces((prev) => prev.filter((p) => p.id !== placeId)),
      },
    ]);
  };

  const updatePlaceNotes = (placeId: string, newNotes: string) => {
    setAddedPlaces((prev) =>
      prev.map((p) => (p.id === placeId ? { ...p, notes: newNotes } : p))
    );
  };

  const handleSave = useCallback(async () => {
    if (!tripName.trim()) {
      Alert.alert("Trip Name Missing", "Please enter a trip name.");
      return;
    }

    if (addedPlaces.length === 0) {
      Alert.alert("No Places Added", "Please add at least one place.");
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
        const tripRef = ref(db, `trips/${user?.uid}/${tripId}`);
        const oldSnapshot = await get(tripRef);
        const oldTrip = oldSnapshot.val();
        const isShared = oldTrip?.isShared ?? false;

        await set(tripRef, {
          ...tripData,
          createdAt: oldTrip?.createdAt || new Date().toISOString(),
          isShared,
        });

        Alert.alert("Trip Updated", "Your trip has been updated.");
      } else {
        const newTripRef = push(baseRef);
        await set(newTripRef, {
          ...tripData,
          createdAt: new Date().toISOString(),
          isShared: false,
        });

        setTripId(newTripRef.key);
        Alert.alert("Trip Saved", "Your trip has been saved.");
      }
      console.log(tripData);
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Save Failed", "Unable to save trip.");
    }
  }, [tripName, addedPlaces, user, tripId]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trip Editor</Text>

      <TextInput
        style={styles.placeNotesInput}
        placeholder="Enter trip name"
        value={tripName}
        onChangeText={setTripName}
      />

      <PlaceSearchBar addedPlaces={addedPlaces} setAddedPlaces={addPlace} />

      <View style={styles.addedPlacesList}>
        <Text style={styles.placeName}>Added Places</Text>
        <AddedPlaceList
          addedPlaces={addedPlaces}
          onUpdateNotes={updatePlaceNotes}
          onRemovePlace={removePlace}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Trip</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TripEditorScreen;
