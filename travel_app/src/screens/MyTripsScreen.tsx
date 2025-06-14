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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/myTrips";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "MyTrips">;

interface Trip {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  destinationCount: number;
  imageUrl?: string;
  status: "upcoming" | "ongoing" | "completed";
}

const MyTripsScreen = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    loadTrips();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadTrips = () => {
    // Mock data, can be connected to backend later
    setTrips([
      {
        id: "1",
        title: "Japan Cherry Blossom",
        startDate: "2025-06-01",
        endDate: "2025-06-08",
        destinationCount: 12,
        status: "upcoming",
      },
      {
        id: "2",
        title: "Taichung Food Journey",
        startDate: "2025-05-12",
        endDate: "2025-05-13",
        destinationCount: 8,
        status: "completed",
      },
      {
        id: "3",
        title: "Hokkaido Winter Experience",
        startDate: "2025-07-15",
        endDate: "2025-07-22",
        destinationCount: 15,
        status: "upcoming",
      },
    ]);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API request
    setTimeout(() => {
      loadTrips();
      setRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: Trip["status"]) => {
    switch (status) {
      case "upcoming":
        return "#4CAF50";
      case "ongoing":
        return "#FF9800";
      case "completed":
        return "#9E9E9E";
      default:
        return "#2196F3";
    }
  };

  const getStatusText = (status: Trip["status"]) => {
    switch (status) {
      case "upcoming":
        return "Upcoming";
      case "ongoing":
        return "Ongoing";
      case "completed":
        return "Completed";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
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
    const days = calculateDays(item.startDate, item.endDate);

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

            <Text style={styles.tripTitle}>{item.title}</Text>

            <View style={styles.tripInfo}>
              <View style={styles.infoItem}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.tripDate}>
                  {formatDate(item.startDate)} - {formatDate(item.endDate)}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons
                  name="time-outline"
                  size={16}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.tripDuration}>{days} days</Text>
              </View>
            </View>

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
