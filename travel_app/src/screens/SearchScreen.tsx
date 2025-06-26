import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/search.js";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

interface AddressObj {
  street1: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
  address_string: string;
}

interface Place {
  location_id: string;
  name: string;
  address_obj: AddressObj;
}

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  let searchTimeout: NodeJS.Timeout;

  const handleDebouncedSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      handleSearch();
    }, 500);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert("Reminder", "Please input keyword");
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `http://xxx.xxx.x.x:4000/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      // console.log("TripAdvisor proxy response:", json);
      setResults(json.data ?? []);
    } catch (err: any) {
      setError(err.message);
      Alert.alert("faill", "search fail");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError(null);
    setHasSearched(false);
  };

  const renderSearchItem = ({ item }: { item: Place }) => (
    <TouchableOpacity
      style={styles.searchItem}
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate("PlaceDetail", { location_id: item.location_id });
        console.log("Navigating to PlaceDetail", item.location_id);
      }}
    >
      <View style={styles.itemContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="location" size={24} color="#007AFF" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.placeName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.placeAddress} numberOfLines={2}>
            {item.address_obj?.address_string || "null"}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (loading) return null;

    if (!hasSearched) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="search" size={64} color="#C7C7CC" />
          <Text style={styles.emptyStateTitle}>Search Attraction</Text>
          <Text style={styles.emptyStateSubtitle}>
            Search Attraction or location
          </Text>
        </View>
      );
    }

    if (results.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="location-outline" size={64} color="#C7C7CC" />
          <Text style={styles.emptyStateTitle}>no result</Text>
          <Text style={styles.emptyStateSubtitle}>please input keyword</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Attractions</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#8E8E93"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search Attraction or location"
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              handleDebouncedSearch();
            }}
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
            placeholderTextColor="#8E8E93"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[styles.searchButton, loading && styles.searchButtonDisabled]}
          onPress={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.searchButtonText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={20} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.location_id}
        renderItem={renderSearchItem}
        style={styles.resultsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          results.length === 0 ? styles.emptyListContainer : undefined
        }
      />
    </View>
  );
};

export default SearchScreen;
