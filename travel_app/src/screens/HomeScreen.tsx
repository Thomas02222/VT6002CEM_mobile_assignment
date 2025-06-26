import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Heart,
  MapPin,
  Calendar,
  Users,
  Share2,
  Bookmark,
  Bell,
  User,
  Cloud,
  Sun,
  CloudRain,
  Thermometer,
} from "lucide-react-native";
import { ref, get, onValue } from "firebase/database";
import { db } from "../firebase/firebase";
import { homeStyles } from "../styles/home";
import { RootStackParamList } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const TravelHomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [sharedTrips, setSharedTrips] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  const user = {
    name: "Guest",
    avatar: "https://i.pravatar.cc/150?u=guest",
  };

  useEffect(() => {
    const getWeather = async (lat: number, lon: number) => {
      const res = await fetch(
        `http://xxx.xxx.x.x:4000/weather?lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      return data;
    };

    const fetchWeather = async () => {
      try {
        const data = await getWeather(25.03, 121.56);
        setWeather(data);
      } catch (error) {
        console.error("Fetch weather failed:", error);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun color="#FFA500" size={24} />;
      case "cloudy":
        return <Cloud color="#87CEEB" size={24} />;
      case "rainy":
        return <CloudRain color="#4682B4" size={24} />;
      case "partly-cloudy":
      default:
        return <Cloud color="#87CEEB" size={24} />;
    }
  };

  useEffect(() => {
    const sharedRef = ref(db, "sharedTrips");
    onValue(sharedRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sharedTrips = Object.entries(data).map(([id, trip]: any) => ({
          id,
          title: trip.title || "Untitled Trip",
          destination: trip.destination || "Unknown Destination",
          description: trip.description || "No description provided.",
          image: trip.image || "https://source.unsplash.com/400x300/?travel",
          duration: trip.duration || "3 days",
          budget: trip.budget || "Unknown",
          participants: trip.participants || 1,
          tags: trip.tags || ["Travel", "Shared"],

          likes: trip.likes || 0,
          timeAgo: "just now",
          userId: trip.userId,

          author: {
            name: trip.author?.name || "Anonymous",
            avatar:
              trip.author?.avatar ||
              `https://i.pravatar.cc/100?u=${trip.userId}`,
          },
        }));
        setSharedTrips(sharedTrips);
      } else {
        setSharedTrips([]);
      }
      setLoading(false);
    });
  }, []);

  const handleLike = (postId: string) => {
    const updated = new Set(likedPosts);
    updated.has(postId) ? updated.delete(postId) : updated.add(postId);
    setLikedPosts(updated);
  };

  const handleBookmark = (postId: string) => {
    const updated = new Set(bookmarkedPosts);
    updated.has(postId) ? updated.delete(postId) : updated.add(postId);
    setBookmarkedPosts(updated);
  };

  return (
    <View style={homeStyles.travelContainer}>
      {/* Header */}
      <View style={homeStyles.travelHeader}>
        <View style={homeStyles.travelHeaderContent}>
          <View style={homeStyles.travelUserInfo}>
            <Image
              source={{ uri: user.avatar }}
              style={homeStyles.travelAvatar}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={homeStyles.travelGreeting}>Hi, {user.name}</Text>
              <Text style={homeStyles.travelSubGreeting}>
                Ready for your next trip?
              </Text>
            </View>
          </View>
          <View style={homeStyles.travelHeaderActions}>
            <TouchableOpacity style={homeStyles.travelIconButton}>
              <Bell color="#6b7280" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.travelIconButton}>
              <User color="#6b7280" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={homeStyles.travelMainContent}
        contentContainerStyle={{ paddingTop: 80, paddingBottom: 80 }}
      >
        {/* Weather Card */}
        <View style={homeStyles.weatherCard}>
          <View style={homeStyles.weatherHeader}>
            <MapPin color="#6b7280" size={16} />
          </View>

          {weatherLoading ? (
            <ActivityIndicator
              size="small"
              color="#2563eb"
              style={{ marginVertical: 20 }}
            />
          ) : weather ? (
            <View style={homeStyles.weatherContent}>
              <View style={homeStyles.weatherMain}>
                <View style={homeStyles.weatherIconTemp}>
                  {getWeatherIcon(weather.icon)}
                  <Text style={homeStyles.weatherTemp}>
                    {weather.temperature}°C
                  </Text>
                </View>
                <View style={homeStyles.weatherDetails}>
                  <Text style={homeStyles.weatherCondition}>
                    {weather.condition}
                  </Text>
                  <Text style={homeStyles.weatherFeels}>
                    Feels like {weather.feelsLike}°C
                  </Text>
                </View>
              </View>

              <View style={homeStyles.weatherStats}>
                <View style={homeStyles.weatherStat}>
                  <Text style={homeStyles.weatherStatLabel}>Humidity</Text>
                  <Text style={homeStyles.weatherStatValue}>
                    {weather.humidity}%
                  </Text>
                </View>
                <View style={homeStyles.weatherStat}>
                  <Text style={homeStyles.weatherStatLabel}>Wind</Text>
                  <Text style={homeStyles.weatherStatValue}>
                    {weather.windSpeed} km/h
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <Text style={homeStyles.weatherError}>
              Unable to load weather data
            </Text>
          )}
        </View>

        <Text style={homeStyles.travelSectionTitle}>Latest Travel Plans</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#2563eb"
            style={{ marginTop: 30 }}
          />
        ) : sharedTrips.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            No shared trips found.
          </Text>
        ) : (
          sharedTrips.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={homeStyles.travelPostCard}
              onPress={() =>
                navigation.navigate("TripView", {
                  tripId: post.id,
                  userId: post.userId,
                })
              }
            >
              {/* Post Header */}
              <View style={homeStyles.travelPostHeader}>
                <Image
                  source={{ uri: post.author.avatar }}
                  style={homeStyles.travelPostAvatar}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={homeStyles.travelPostAuthor}>
                    {post.author.name}
                  </Text>
                  <Text style={homeStyles.travelPostTime}>{post.timeAgo}</Text>
                </View>
              </View>

              {/* Post Content */}
              <Text style={homeStyles.travelPostDestination}>
                {post.destination}
              </Text>
              <Text style={homeStyles.travelPostTitle}>{post.title}</Text>
              <Text style={homeStyles.travelPostDescription}>
                {post.description}
              </Text>
              <Image
                source={{ uri: post.image }}
                style={homeStyles.travelPostImage}
              />

              {/* Info Row */}
              <View style={homeStyles.travelPostInfoRow}>
                {/* ... your info rows like Calendar, MapPin, etc ... */}
              </View>

              {/* Tags */}
              <View style={homeStyles.travelPostTags}>
                {post.tags.map((tag: string) => (
                  <View key={tag} style={homeStyles.travelPostTag}>
                    <Text style={homeStyles.travelPostTagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Like & Share Actions */}
              <View style={homeStyles.travelPostActions}>
                <TouchableOpacity
                  style={homeStyles.travelPostActionButton}
                  onPress={() => handleLike(post.id)}
                >
                  <Heart
                    color={likedPosts.has(post.id) ? "#ef4444" : "#6b7280"}
                    fill={likedPosts.has(post.id) ? "#ef4444" : "none"}
                    size={20}
                  />
                  <Text style={homeStyles.travelPostActionText}>
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={homeStyles.travelPostActionButton}>
                  <Share2 color="#6b7280" size={20} />
                  <Text style={homeStyles.travelPostActionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default TravelHomeScreen;
