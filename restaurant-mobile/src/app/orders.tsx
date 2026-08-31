import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';

import api from '@/services/api';
import { getUser } from '@/services/auth';
import { styles } from '@/styles/orders.styles';

type OrderItem = {
  quantity: number;
};

type Order = {
  id: string;
  status: string;
  totalPrice: number;
  orderDate?: string;
  items: OrderItem[];
};

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setError('');

      const user = await getUser();

      if (!user) {
        setError('User not found.');
        return;
      }

      console.log('Loading orders for user:', user.id);

      const response = await api.get(
        `/orders/user/${user.id}`
      );

      console.log('Orders response:', response.data);

      setOrders(response.data);
    } catch (error: any) {
      console.log(
        'Orders error:',
        error?.response?.data || error
      );

      setError('Could not load your orders.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Pending';

      case 'ACCEPTED':
        return 'Accepted';

      case 'PREPARING':
        return 'Preparing';

      case 'READY':
        return 'Ready';

      case 'DELIVERED':
        return 'Delivered';

      case 'REJECTED':
        return 'Rejected';

      default:
        return status;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'PENDING':
        return styles.statusPending;

      case 'ACCEPTED':
        return styles.statusAccepted;

      case 'PREPARING':
        return styles.statusPreparing;

      case 'READY':
        return styles.statusReady;

      case 'DELIVERED':
        return styles.statusDelivered;

      case 'REJECTED':
        return styles.statusRejected;

      default:
        return styles.statusDefault;
    }
  };

  
const getOrderHeaderStyle = (status: string) => {
  switch (status) {
    case 'PENDING':
      return styles.orderHeaderPending;

    case 'ACCEPTED':
      return styles.orderHeaderAccepted;

    case 'PREPARING':
      return styles.orderHeaderPreparing;

    case 'READY':
      return styles.orderHeaderReady;

    case 'DELIVERED':
      return styles.orderHeaderDelivered;

    case 'REJECTED':
      return styles.orderHeaderRejected;

    default:
      return styles.orderHeaderDefault;
  }
};


  const formatDate = (date?: string) => {
    if (!date) {
      return 'Date unavailable';
    }

    try {
      return new Date(date).toLocaleString();
    } catch {
      return 'Date unavailable';
    }
  };

  const getItemCount = (items?: OrderItem[]) => {
    if (!items) {
      return 0;
    }

    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  const openOrderDetails = (orderId: string) => {
    router.push({
      pathname: '/order-details',
      params: {
        orderId,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading your orders...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.backText}>
            ← Home
          </Text>
        </Pressable>

        <Text style={styles.title}>
          My Orders
        </Text>
      </View>

      {error ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.error}>
            {error}
          </Text>

          <Pressable
            style={styles.button}
            onPress={loadOrders}
          >
            <Text style={styles.buttonText}>
              Try Again
            </Text>
          </Pressable>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            You don't have any orders yet.
          </Text>

          <Text style={styles.emptyText}>
            Your orders will appear here after you
            place an order.
          </Text>

          <Pressable
            style={styles.button}
            onPress={() => router.replace('/home')}
          >
            <Text style={styles.buttonText}>
              Start Shopping
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.orderCard,
                pressed && styles.orderCardPressed,
              ]}
              onPress={() =>
                openOrderDetails(item.id)
              }
            >
              
              <View
                style={[
                  styles.orderHeader,
                  getOrderHeaderStyle(item.status),
                ]}
              >
                <Text style={styles.orderTitle}>
                  Order #{item.id.substring(0, 8)}
                </Text>

                <Text
                  style={[
                    styles.status,
                    getStatusStyle(item.status),
                  ]}
                >
                  {getStatusText(item.status)}
                </Text>
              </View>



              <View style={styles.summaryRow}>
                <Text style={styles.itemCount}>
                  {getItemCount(item.items)}{' '}
                  {getItemCount(item.items) === 1
                    ? 'item'
                    : 'items'}
                </Text>

                <Text style={styles.orderDate}>
                  {formatDate(item.orderDate)}
                </Text>
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>
                  Total
                </Text>

                <Text style={styles.total}>
                  ${item.totalPrice.toFixed(2)}
                </Text>
              </View>

              <Text style={styles.detailsText}>
                View Details →
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}