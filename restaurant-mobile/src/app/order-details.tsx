import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import api from '@/services/api';
import { styles } from '@/styles/order-details.styles';

type OrderItem = {
  itemName: string;
  optionName?: string;
  optionId?: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  status: string;
  totalPrice: number;
  orderDate?: string;
  customerNote?: string;
  paymentMethod?: string;

  customerName?: string;
  customerPhone?: string;

  addressLabel?: string;
  addressDescription?: string;
  latitude?: number;
  longitude?: number;

  rejectionReason?: string;

  items: OrderItem[];
};

export default function OrderDetailsScreen() {
  const { orderId } = useLocalSearchParams<{
    orderId: string;
  }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      if (!orderId) {
        Alert.alert('Error', 'Order ID is missing.');
        return;
      }

      console.log('Loading order:', orderId);

      const response = await api.get(
        `/orders/${orderId}`
      );

      console.log('Order details:', response.data);

      setOrder(response.data);
    } catch (error: any) {
      console.log(
        'Order details error:',
        error?.response?.data || error
      );

      Alert.alert(
        'Error',
        'Could not load order details.'
      );
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

  const statusSteps = [
    'PENDING',
    'ACCEPTED',
    'PREPARING',
    'READY',
    'DELIVERED',
  ];

  const getStatusStepIndex = (status: string) => {
    return statusSteps.indexOf(status);
  };

  const formatOrderDate = (date?: string) => {
    if (!date) {
      return 'Date not available';
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return 'Date not available';
    }

    return parsedDate.toLocaleString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading order details...
        </Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>
          Could not find this order.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.replace('/orders')}
        >
          <Text style={styles.buttonText}>
            Back to My Orders
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace('/orders')}
        >
          <Text style={styles.backText}>
            ← Orders
          </Text>
        </Pressable>

        <Text style={styles.title}>
          Order Details
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Order summary */}
        <View style={styles.card}>
          <View style={styles.orderTopRow}>
            <Text style={styles.orderId}>
              Order #{order.id.substring(0, 8)}
            </Text>

            <Text style={styles.orderDate}>
              {formatOrderDate(order.orderDate)}
            </Text>

            <Text
              style={[
                styles.status,
                getStatusStyle(order.status),
              ]}
            >
              {getStatusText(order.status)}
            </Text>
          </View>
        </View>

        {/* Order Progress */}
        {order.status !== 'REJECTED' ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Order Progress
            </Text>

            <View style={styles.progressContainer}>
              {statusSteps.map((step, index) => {
                const currentIndex =
                  getStatusStepIndex(order.status);

                const completed = index <= currentIndex;
                const current = index === currentIndex;

                return (
                  <View
                    key={step}
                    style={styles.progressStep}
                  >
                    <View
                      style={[
                        styles.progressCircle,
                        completed &&
                        styles.progressCircleCompleted,
                        current &&
                        styles.progressCircleCurrent,
                      ]}
                    >
                      <Text
                        style={[
                          styles.progressCircleText,
                          completed &&
                          styles.progressCircleTextCompleted,
                        ]}
                      >
                        {completed ? '✓' : ''}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.progressLabel,
                        current &&
                        styles.progressLabelCurrent,
                      ]}
                    >
                      {getStatusText(step)}
                    </Text>

                    {index < statusSteps.length - 1 ? (
                      <View
                        style={[
                          styles.progressLine,
                          index < currentIndex &&
                          styles.progressLineCompleted,
                        ]}
                      />
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Order Status
            </Text>

            <Text style={styles.rejectedStatus}>
              Order Rejected
            </Text>

            {order.rejectionReason ? (
              <Text style={styles.rejectionReason}>
                Reason: {order.rejectionReason}
              </Text>
            ) : (
              <Text style={styles.rejectionReason}>
                No rejection reason was provided.
              </Text>
            )}
          </View>
        )}



        {/* Items */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Order Items
          </Text>

          {order.items.map((item, index) => (
            <View
              key={
                item.optionId ||
                `${order.id}-${index}`
              }
              style={styles.itemRow}
            >
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                  {item.itemName}
                </Text>

                {item.optionName ? (
                  <Text style={styles.optionName}>
                    Option: {item.optionName}
                  </Text>
                ) : null}

                <Text style={styles.itemPrice}>
                  ${item.price.toFixed(2)}
                </Text>
              </View>

              <View style={styles.itemRight}>
                <Text style={styles.itemQuantity}>
                  x{item.quantity}
                </Text>

                <Text style={styles.itemSubtotal}>
                  $
                  {(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.total}>
              ${order.totalPrice.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Payment */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Payment Method
          </Text>

          <Text style={styles.infoText}>
            {order.paymentMethod === 'CREDIT_CARD'
              ? 'Credit Card'
              : order.paymentMethod === 'CASH'
                ? 'Cash'
                : 'Not specified'}
          </Text>
        </View>

        {/* Delivery address */}
        {(order.addressLabel ||
          order.addressDescription) && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>
                Delivery Address
              </Text>

              {order.addressLabel ? (
                <Text style={styles.addressLabel}>
                  {order.addressLabel}
                </Text>
              ) : null}

              {order.addressDescription ? (
                <Text style={styles.addressDescription}>
                  {order.addressDescription}
                </Text>
              ) : null}
            </View>
          )}

        {/* Customer note */}
        {order.customerNote ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Customer Note
            </Text>

            <Text style={styles.infoText}>
              {order.customerNote}
            </Text>
          </View>
        ) : null}



        {/* Back button */}
        <Pressable
          style={styles.button}
          onPress={() => router.replace('/orders')}
        >
          <Text style={styles.buttonText}>
            Back to My Orders
          </Text>
        </Pressable>

      </ScrollView>
    </View>
  );
}