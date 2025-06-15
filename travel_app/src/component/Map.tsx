import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

interface Location {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  description?: string;
}

interface MapComponentProps {
  locations: Location[];
  onLocationPress?: (location: Location) => void;
  onMapPress?: (coordinate: { latitude: number; longitude: number }) => void;
  initialRegion?: Region;
  showUserLocation?: boolean;
  style?: any;
}

const { width, height } = Dimensions.get("window");

const MapComponent: React.FC<MapComponentProps> = ({
  locations = [],
  onLocationPress,
  onMapPress,
  initialRegion,
  showUserLocation = true,
  style,
}) => {
  const mapRef = useRef<MapView>(null);
  const [mapRegion, setMapRegion] = useState<Region>(
    initialRegion || {
      latitude: 25.033, 
      longitude: 121.5654,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );


  const fitToMarkers = () => {
    if (locations.length > 0 && mapRef.current) {
      const coordinates = locations.map((location) => ({
        latitude: location.latitude,
        longitude: location.longitude,
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (locations.length > 0) {

      setTimeout(() => {
        fitToMarkers();
      }, 1000);
    }
  }, [locations]);

  const handleMarkerPress = (location: Location) => {
    if (onLocationPress) {
      onLocationPress(location);
    }
  };

  const handleMapPress = (event: any) => {
    const coordinate = event.nativeEvent.coordinate;
    if (onMapPress) {
      onMapPress(coordinate);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        onRegionChangeComplete={setMapRegion}
        onPress={handleMapPress}
        showsUserLocation={showUserLocation}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        mapType="standard"
      >
        {locations.map((location, index) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description={location.description}
            onPress={() => handleMarkerPress(location)}
          >
            <View style={styles.markerContainer}>
              <View
                style={[
                  styles.marker,
                  { backgroundColor: getMarkerColor(index) },
                ]}
              >
                <Text style={styles.markerText}>{index + 1}</Text>
              </View>
              <View style={styles.markerTriangle} />
            </View>
          </Marker>
        ))}
      </MapView>

      {locations.length > 1 && (
        <TouchableOpacity style={styles.fitButton} onPress={fitToMarkers}>
          <Ionicons name="resize-outline" size={20} color="white" />
        </TouchableOpacity>
      )}

      {locations.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="location-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>no location</Text>
          <Text style={styles.emptySubtext}>click location</Text>
        </View>
      )}
    </View>
  );
};

const getMarkerColor = (index: number): string => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
  ];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    alignItems: "center",
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    marginTop: -2,
  },
  fitButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -50 }],
    alignItems: "center",
    width: 200,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    marginTop: 10,
    fontWeight: "600",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 5,
    textAlign: "center",
  },
});

export default MapComponent;
