import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, ActivityIndicator } from "react-native";
import { colors, tripEditorStyles as styles } from "../styles/tripEdit";
import { Ionicons } from "@expo/vector-icons";
import PlaceSearchResults from "./PlaceSearchResults";
import { Place } from "../types/place";

interface Props {
  addedPlaces: Place[];
  setAddedPlaces: (place: Place) => void;
}

const PlaceSearchBar: React.FC<Props> = ({ addedPlaces, setAddedPlaces }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchPlaces(searchQuery.trim());
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchPlaces = async (query: string) => {
    try {
      setIsSearching(true);
      const res = await fetch(
        `http://xxx.xxx.x.x:4000/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (!data.data || data.data.length === 0) {
        setSearchResults([]);
        return;
      }

      const results: Place[] = data.data.map((item: any) => ({
        id: item.location_id,
        name: item.name,
        description: item.address_obj?.address_string || "",
        category: item.result_type || "Unknown",
      }));

      setSearchResults(results);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddPlace = (place: Place) => {
    setAddedPlaces(place);
    setSearchQuery("");
    setSearchResults([]);
    searchInputRef.current?.blur();
  };

  return (
    <View style={styles.searchSection}>
      <View style={styles.searchCard}>
        <Ionicons
          name="search"
          size={20}
          color={colors.primary}
          style={styles.searchIcon}
        />
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search places..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={() => fetchPlaces(searchQuery.trim())}
          clearButtonMode="while-editing"
        />
        {isSearching && (
          <ActivityIndicator size="small" color={colors.primary} />
        )}
      </View>

      <PlaceSearchResults results={searchResults} onAddPlace={handleAddPlace} />
    </View>
  );
};

export default PlaceSearchBar;
