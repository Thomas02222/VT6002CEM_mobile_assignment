import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Animated,
  RefreshControl,
  Alert,
  Dimensions,
  Share,
  ActionSheetIOS,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/myTrips";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import {
  getDatabase,
  ref,
  onValue,
  update,
  ref as dbRef,
} from "firebase/database";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { set } from "firebase/database";
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "MyTrips">;

interface Trip {
  id: string;
  title: string;
  destinationCount: number;
  imageUrl?: string;
  status: "upcoming";
}

const MyTripsScreen = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();

  useEffect(() => {
    loadTrips();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadTrips = () => {
    const db = getDatabase();
    const userId = user?.uid;

    if (!userId) return;

    const tripsRef = ref(db, `trips/${userId}`);

    onValue(tripsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const determineStatus = (createdAt: string): Trip["status"] => {
          return "upcoming";
        };

        const loadedTrips: Trip[] = Object.entries(data).map(
          ([tripId, trip]: any) => ({
            id: tripId,
            title: trip.title || "Untitled Trip",
            destinationCount: trip.places?.length || 0,
            imageUrl: "",
            status: determineStatus(trip.createdAt),
          })
        );

        setTrips(loadedTrips);
      } else {
        setTrips([]);
      }
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadTrips();
      setRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: Trip["status"]) => {
    switch (status) {
      case "upcoming":
        return "#4CAF50";
    }
  };

  const getStatusText = (status: Trip["status"]) => {
    switch (status) {
      case "upcoming":
        return "Upcoming";
      default:
        return "";
    }
  };

  // 分享行程功能
  const handleShareTrip = async (trip: Trip) => {
    try {
      const shareMessage = `Check out my trip: ${trip.title}\n${trip.destinationCount} amazing locations to explore!\n\nPlanned with TripApp `;
      const shareUrl = `https://yourapp.com/trip/${trip.id}`;

      if (Platform.OS === "ios") {
        const options = ["Copy Link", "Send to Home Screen", "Cancel"];

        ActionSheetIOS.showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex: 3,
            title: `Share "${trip.title}"`,
            message: "Choose how you want to share this trip",
          },
          (buttonIndex) => {
            switch (buttonIndex) {
              case 0:
                copyTripLink(shareUrl);
                break;
              case 1:
                shareToHomeScreen(trip);
                break;
            }
          }
        );
      }
    } catch (error) {
      console.error("Share error:", error);
      Alert.alert("Share Error", "Unable to share trip at this time.");
    }
  };

  const copyTripLink = (url: string) => {
    Alert.alert("Link Copied", "Trip link has been copied to clipboard!");
  };

  const shareToHomeScreen = (trip: Trip) => {
    Alert.alert(
      "Add to Home Screen",
      `Create a shortcut for "${trip.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add",
          onPress: () => {
            const userId = user?.uid;
            const tripRef = dbRef(db, `trips/${userId}/${trip.id}`);
            const sharedRef = dbRef(db, `sharedTrips/${trip.id}`);

            update(tripRef, { isShared: true });

            set(sharedRef, {
              userId,
              tripId: trip.id,
              title: trip.title,
              destinationCount: trip.destinationCount,
              timestamp: Date.now(),
            })
              .then(() => {
                Alert.alert("Shared", `"${trip.title}" shared successfully.`);
              })
              .catch(() => {
                Alert.alert("Error", "Failed to share trip.");
              });
          },
        },
      ]
    );
  };

  const handleDeleteTrip = (tripId: string, tripTitle: string) => {
    Alert.alert(
      "Delete Trip",
      `Are you sure you want to delete "${tripTitle}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setTrips(trips.filter((trip) => trip.id !== tripId));
          },
        },
      ]
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="airplane-outline" size={80} color="#E0E0E0" />
      <Text style={styles.emptyTitle}>No trips yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the + button in the top right to start planning your first journey!
      </Text>
    </View>
  );

  const renderItem = ({ item, index }: { item: Trip; index: number }) => {
    return (
      <Animated.View
        style={[
          styles.tripCard,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.cardContent}
          onPress={() => navigation.navigate("TripEditor", { tripId: item.id })}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardHeader}>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(item.status) },
                  ]}
                />
                <Text style={styles.statusText}>
                  {getStatusText(item.status)}
                </Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={() => handleShareTrip(item)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name="share-outline"
                    size={18}
                    color="rgba(255,255,255,0.9)"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteTrip(item.id, item.title)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color="rgba(255,255,255,0.7)"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.tripTitle}>{item.title}</Text>

            <View style={styles.tripStats}>
              <View style={styles.statItem}>
                <Ionicons name="location-outline" size={20} color="#FFD700" />
                <Text style={styles.statNumber}>{item.destinationCount}</Text>
                <Text style={styles.statLabel}>locations</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Trips</Text>
          <Text style={styles.headerSubtitle}>
            {trips.length > 0
              ? `${trips.length} trips total`
              : "Start your journey"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("TripEditor" as never)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#FF6B6B", "#FF8E53"]}
            style={styles.addButtonGradient}
          >
            <Ionicons name="add" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContainer,
          trips.length === 0 && styles.emptyListContainer,
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#667eea"
            colors={["#667eea"]}
          />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

export default MyTripsScreen;
