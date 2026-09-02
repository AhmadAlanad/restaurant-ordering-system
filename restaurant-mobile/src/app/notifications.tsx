import { styles } from '@/styles/notifications.styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    Text,
    View,
} from 'react-native';

import {
    getNotifications,
    markNotificationAsRead,
} from '@/services/notification';

type Notification = {
  id: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();

      console.log('Notifications:', data);

      setNotifications(data);
    } catch (error: any) {
      console.log(
        'Notifications error:',
        error?.response?.data || error
      );

      Alert.alert(
        'Error',
        'Could not load notifications.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationPress = async (
    notification: Notification
  ) => {
    try {
      if (!notification.read) {
        await markNotificationAsRead(
          notification.id
        );

        setNotifications((currentNotifications) =>
          currentNotifications.map((item) =>
            item.id === notification.id
              ? {
                  ...item,
                  read: true,
                }
              : item
          )
        );
      }
    } catch (error: any) {
      console.log(
        'Mark notification error:',
        error?.response?.data || error
      );
    }
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return '';
    }

    return parsedDate.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading notifications...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/home');
            }
          }}
        >
          <Text style={styles.backText}>
            ← Back
          </Text>
        </Pressable>

        <Text style={styles.title}>
          Notifications
        </Text>
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No notifications yet
          </Text>

          <Text style={styles.emptyText}>
            Your order updates will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.notificationCard,
                !item.read &&
                  styles.unreadNotification,
              ]}
              onPress={() =>
                handleNotificationPress(item)
              }
            >
              <View style={styles.notificationContent}>
                <Text
                  style={[
                    styles.message,
                    !item.read &&
                      styles.unreadMessage,
                  ]}
                >
                  {item.message}
                </Text>

                <Text style={styles.date}>
                  {formatDate(item.createdAt)}
                </Text>
              </View>

              {!item.read ? (
                <View style={styles.unreadDot} />
              ) : null}
            </Pressable>
          )}
        />
      )}
    </View>
  );
}