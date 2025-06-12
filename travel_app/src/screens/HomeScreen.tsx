import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Heart,
  MapPin,
  Calendar,
  Users,
  Share2,
  Bookmark,
  Search,
  Bell,
  User,
} from "lucide-react-native"; 

import { homeStyles } from "../styles/home"; 

const TravelHomeScreen = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(
    new Set()
  );

  const user = {
    name: "Alice Chen",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  };


  const travelPosts = [
    {
      id: 1,
      author: {
        name: "Jason Wong",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      destination: "Kyoto, Japan",
      title: "Cherry Blossom Adventure",
      description:
        "5-day cultural immersion with temple visits and traditional experiences",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
      duration: "5 days",
      budget: "NT$28,000",
      likes: 124,
      participants: 3,
      tags: ["Cultural", "Nature", "Photography"],
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      author: {
        name: "Sarah Kim",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      destination: "Santorini, Greece",
      title: "Sunset & Sea Escape",
      description: "Romantic getaway with stunning sunsets and azure waters",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
      duration: "7 days",
      budget: "NT$45,000",
      likes: 89,
      participants: 2,
      tags: ["Romantic", "Beach", "Luxury"],
      timeAgo: "5 hours ago",
    },
    {
      id: 3,
      author: {
        name: "Mike Chen",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      destination: "Banff, Canada",
      title: "Mountain Hiking Expedition",
      description:
        "Adventure through Canadian Rockies with breathtaking landscapes",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      duration: "10 days",
      budget: "NT$55,000",
      likes: 156,
      participants: 6,
      tags: ["Adventure", "Hiking", "Nature"],
      timeAgo: "1 day ago",
    },
  ];


  const handleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };


  const handleBookmark = (postId: number) => {
    const newBookmarkedPosts = new Set(bookmarkedPosts);
    if (newBookmarkedPosts.has(postId)) {
      newBookmarkedPosts.delete(postId);
    } else {
      newBookmarkedPosts.add(postId);
    }
    setBookmarkedPosts(newBookmarkedPosts);
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
              <Text style={homeStyles.travelGreeting}>Hi, {user.name} </Text>
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
        {/* Travel Posts */}
        <Text style={homeStyles.travelSectionTitle}>Latest Travel Plans</Text>
        {travelPosts.map((post) => (
          <View key={post.id} style={homeStyles.travelPostCard}>
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
              <TouchableOpacity
                onPress={() => handleBookmark(post.id)}
                style={homeStyles.travelPostBookmark}
              >
                <Bookmark
                  color={bookmarkedPosts.has(post.id) ? "#2563eb" : "#6b7280"}
                  fill={bookmarkedPosts.has(post.id) ? "#2563eb" : "none"}
                  size={20}
                />
              </TouchableOpacity>
            </View>

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

            <View style={homeStyles.travelPostInfoRow}>
              <View style={homeStyles.travelPostInfoItem}>
                <Calendar color="#6b7280" size={16} />
                <Text style={homeStyles.travelPostInfoText}>
                  {post.duration}
                </Text>
              </View>
              <View style={homeStyles.travelPostInfoItem}>
                <MapPin color="#6b7280" size={16} />
                <Text style={homeStyles.travelPostInfoText}>{post.budget}</Text>
              </View>
              <View style={homeStyles.travelPostInfoItem}>
                <Users color="#6b7280" size={16} />
                <Text style={homeStyles.travelPostInfoText}>
                  {post.participants} participants
                </Text>
              </View>
            </View>

            {/* Tags */}
            <View style={homeStyles.travelPostTags}>
              {post.tags.map((tag) => (
                <View key={tag} style={homeStyles.travelPostTag}>
                  <Text style={homeStyles.travelPostTagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* Like & Share */}
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
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TravelHomeScreen;
