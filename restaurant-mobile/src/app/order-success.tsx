import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function OrderSuccessScreen() {
  const { orderId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>✓</Text>

        <Text style={styles.title}>
          Order Successful!
        </Text>

        <Text style={styles.message}>
          Your order has been placed successfully.
        </Text>

        {orderId ? (
          <Text style={styles.orderId}>
            Order ID: {orderId}
          </Text>
        ) : null}

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.primaryButtonText}>
            Back to Menu
          </Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.replace('/orders')}
        >
          <Text style={styles.secondaryButtonText}>
            View My Orders
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  card: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
  },

  icon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#222222',
    color: '#ffffff',
    fontSize: 42,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 68,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },

  message: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },

  orderId: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 25,
    textAlign: 'center',
  },

  primaryButton: {
    width: '100%',
    backgroundColor: '#222222',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  secondaryButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#222222',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '700',
  },
});
