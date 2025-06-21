import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ref, get } from "firebase/database";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import MapComponent from "../component/Map";
import { Place } from "../types/place";
import { tripViewStyles as styles, colors } from "../styles/tripView";

interface RouteParams {
  tripId: string;
  userId?: string;
}

interface TripData {
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isShared: boolean;
  places: Place[];
}

const TripViewScreen: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();

  const { tripId, userId } = route.params as RouteParams;
  const targetUserId = userId || user?.uid;

  const [tripData, setTripData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTripData = async () => {
    if (!targetUserId || !tripId) {
      setError("無效的行程參數");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const tripRef = ref(db, `trips/${targetUserId}/${tripId}`);
      const snapshot = await get(tripRef);
      const data = snapshot.val();

      if (data) {
        const tripData: TripData = {
          userId: data.userId || targetUserId,
          title: data.title || "",
          createdAt: data.createdAt || "",
          updatedAt: data.updatedAt || "",
          isShared: data.isShared || false,
          places: (data.places || []).map((place: any) => ({
            id: place.id || "",
            name: place.name || "unknow",
            description: place.description || "",
            category: place.category || "",
            notes: place.notes || "",
            latitude: place.latitude || 0,
            longitude: place.longitude || 0,
          })),
        };
        setTripData(tripData);
      } else {
        setError("travel not found");
      }
    } catch (error) {
      setError("reload fail, please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTripData();
  }, [tripId, targetUserId]);

  const handleRetry = () => {
    fetchTripData();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>loading</Text>
      </View>
    );
  }

  if (error || !tripData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "loading fail"}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{tripData.title}</Text>
        <View style={styles.metaInfo}>
          <Text style={styles.locationCount}>
            {tripData.places.length} Place
          </Text>
          <Text style={styles.subtitle}>
            Update To {formatDate(tripData.updatedAt)}
          </Text>
          {tripData.isShared && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>shared</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapComponent
          locations={tripData.places.map((place) => ({
            id: place.id,
            title: place.name,
            latitude: place.latitude ?? 0,
            longitude: place.longitude ?? 0,
            description: place.description ?? "",
          }))}
          showUserLocation={false}
        />
      </View>

      <View style={styles.locationsList}>
        <Text style={styles.sectionTitle}>Travel place</Text>
        {tripData.places.map((place, index) => (
          <View key={place.id} style={styles.locationItem}>
            <View style={styles.locationHeader}>
              <Text style={styles.locationNumber}>{index + 1}</Text>
              <View style={styles.locationInfo}>
                <Text style={styles.locationTitle}>{place.name}</Text>
                {place.category && (
                  <Text style={styles.locationCategory}>{place.category}</Text>
                )}
              </View>
            </View>

            {place.description && (
              <Text style={styles.locationDescription}>
                {place.description}
              </Text>
            )}

            {place.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>Note:</Text>
                <Text style={styles.notesText}>{place.notes}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TripViewScreen;
