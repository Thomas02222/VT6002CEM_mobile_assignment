// screens/PlaceDetailScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { styles as placeDetailstyles } from "../styles/placeDetailStyles";

type Props = NativeStackScreenProps<RootStackParamList, "PlaceDetail">;

interface PlaceDetail {
  name: string;
  address_obj?: {
    address_string?: string;
  };
  description?: string;
  latitude?: string;
  longitude?: string;
  phone?: string;
  website?: string;
  email?: string;
  price_level?: string;
  rating?: string;
  num_reviews?: string;
  ranking?: string;
  photo?: {
    images?: {
      large?: {
        url?: string;
      };
    };
  };
  hours?: {
    week_ranges?: Array<Array<{ open_time: number; close_time: number }>>;
  };
  cuisine?: Array<{ name: string }>;
  dietary_restrictions?: Array<{ name: string }>;
}

const { width, height } = Dimensions.get("window");

const PlaceDetailScreen = ({ route, navigation }: Props) => {
  const { location_id } = route.params;
  const [detail, setDetail] = useState<PlaceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `http://xxx.xxx.x.x:4000/detail?location_id=${location_id}`
        );
        if (!res.ok) throw new Error("Failed to fetch detail");

        const json = await res.json();
        console.log("Detail:", json);
        setDetail(json);
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Failed to fetch detail.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [location_id]);

  const openMaps = () => {
    if (detail?.latitude && detail?.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${detail.latitude},${detail.longitude}`;
      Linking.openURL(url);
    }
  };

  const makePhoneCall = () => {
    if (detail?.phone) {
      Linking.openURL(`tel:${detail.phone}`);
    }
  };

  const openWebsite = () => {
    if (detail?.website) {
      Linking.openURL(detail.website);
    }
  };

  if (loading) {
    return (
      <View style={placeDetailstyles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={placeDetailstyles.loadingText}>reloading...</Text>
      </View>
    );
  }

  if (!detail) {
    return (
      <View style={placeDetailstyles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={50} color="#FF6B6B" />
        <Text style={placeDetailstyles.errorText}>reloading fail</Text>
        <TouchableOpacity
          style={placeDetailstyles.retryButton}
          onPress={() => {
            setLoading(true);
          }}
        >
          <Text style={placeDetailstyles.retryButtonText}>Please reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const latitude = detail.latitude ? parseFloat(detail.latitude) : 25.033;
  const longitude = detail.longitude ? parseFloat(detail.longitude) : 121.5654;

  return (
    <ScrollView
      style={placeDetailstyles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* map */}
      <View style={placeDetailstyles.mapContainer}>
        <MapView
          style={placeDetailstyles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title={detail.name}
            description={detail.address_obj?.address_string}
          />
        </MapView>
        <TouchableOpacity
          style={placeDetailstyles.directionsButton}
          onPress={openMaps}
        >
          <Ionicons name="navigate" size={20} color="white" />
          <Text style={placeDetailstyles.directionsButtonText}>search</Text>
        </TouchableOpacity>
      </View>

      {/* info */}
      <View style={placeDetailstyles.infoContainer}>
        <View style={placeDetailstyles.header}>
          <Text style={placeDetailstyles.title}>{detail.name}</Text>
          {detail.rating && (
            <View style={placeDetailstyles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={placeDetailstyles.rating}>{detail.rating}</Text>
              {detail.num_reviews && (
                <Text style={placeDetailstyles.reviewCount}>
                  ({detail.num_reviews})
                </Text>
              )}
            </View>
          )}
        </View>

        {/* address */}
        {detail.address_obj?.address_string && (
          <View style={placeDetailstyles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={placeDetailstyles.address}>
              {detail.address_obj.address_string}
            </Text>
          </View>
        )}

        {/* price */}
        {detail.price_level && (
          <View style={placeDetailstyles.infoRow}>
            <Ionicons name="card-outline" size={20} color="#666" />
            <Text style={placeDetailstyles.priceLevel}>
              price: {detail.price_level}
            </Text>
          </View>
        )}

        {/* rank */}
        {detail.ranking && (
          <View style={placeDetailstyles.infoRow}>
            <Ionicons name="trophy-outline" size={20} color="#666" />
            <Text style={placeDetailstyles.ranking}>{detail.ranking}</Text>
          </View>
        )}

        {/* desc */}
        {detail.description && (
          <View style={placeDetailstyles.descriptionContainer}>
            <Text style={placeDetailstyles.sectionTitle}>description</Text>
            <Text style={placeDetailstyles.description}>
              {detail.description}
            </Text>
          </View>
        )}

        {/* content */}
        <View style={placeDetailstyles.section}>
          <Text style={placeDetailstyles.sectionTitle}>content</Text>

          {detail.phone && (
            <TouchableOpacity
              style={placeDetailstyles.contactButton}
              onPress={makePhoneCall}
            >
              <Ionicons name="call-outline" size={20} color="#007AFF" />
              <Text style={placeDetailstyles.contactButtonText}>
                {detail.phone}
              </Text>
            </TouchableOpacity>
          )}

          {detail.website && (
            <TouchableOpacity
              style={placeDetailstyles.contactButton}
              onPress={openWebsite}
            >
              <Ionicons name="globe-outline" size={20} color="#007AFF" />
              <Text style={placeDetailstyles.contactButtonText}>
                view website
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceDetailScreen;
