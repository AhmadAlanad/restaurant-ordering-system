import { styles } from '@/styles/checkout.styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

import { getAddresses } from '@/services/address';
import { getUser } from '@/services/auth';
import { clearCart, getCart } from '@/services/cart';
import { placeOrder } from '@/services/order';


type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  optionId?: string | null;
  optionName?: string | null;
  optionPrice?: number;
};

type Address = {
  id: string;
  label: string;
  description: string;
  latitude: number;
  longitude: number;
};

export default function CheckoutScreen() {
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<Address | null>(null);

  const [paymentMethod, setPaymentMethod] =
    useState<'CASH' | 'CREDIT_CARD'>('CASH');
  const [customerNote, setCustomerNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    loadCheckout();
  }, []);

  const loadCheckout = async () => {
    try {
      const storedUser = await getUser();
      setUser(storedUser);

      const storedCart = await getCart();
      setCart(storedCart);

      if (storedUser) {
        const userAddresses = await getAddresses(storedUser.id);
        setAddresses(userAddresses);

        if (userAddresses.length > 0) {
          setSelectedAddress(userAddresses[0]);
        }
      }
    } catch (error) {
      console.log('Checkout error:', error);

      Alert.alert(
        'Error',
        'Could not load checkout information.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getItemUnitPrice = (item: CartItem) => {
    if (item.optionId) {
      return item.optionPrice ?? item.price;
    }

    return item.price;
  };

  const getItemTotal = (item: CartItem) => {
    return getItemUnitPrice(item) * item.quantity;
  };

  const total = cart.reduce(
    (sum, item) => sum + getItemTotal(item),
    0
  );

  const handlePlaceOrder = async () => {
    if (!user) {
      Alert.alert('Error', 'User information is missing.');
      return;
    }

    if (cart.length === 0) {
      Alert.alert('Cart Empty', 'Your cart is empty.');
      return;
    }

    if (!selectedAddress) {
      Alert.alert(
        'Address Required',
        'Please select a delivery address.'
      );
      return;
    }

    try {
      setPlacingOrder(true);

      const order = {
        userId: user.id,

        items: cart.map((item) => ({
          menuItemId: item.id,
          optionId: item.optionId ?? null,
          quantity: item.quantity,
        })),

        paymentMethod,

        latitude: selectedAddress.latitude,
        longitude: selectedAddress.longitude,

        addressDescription:
          selectedAddress.description,

        addressLabel:
          selectedAddress.label,

        customerNote: customerNote.trim(),
      };

      console.log('Placing order:', order);

      const result = await placeOrder(order);

      console.log('Order created:', result);

      await clearCart();
      setCart([]);

      router.replace({
        pathname: '/order-success',
        params: {
          orderId: result.id,
        },
      });
    } catch (error: any) {
      console.log(
        'Place order error:',
        error?.response?.data || error
      );

      Alert.alert(
        'Order Failed',
        'Could not place your order.'
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading checkout...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>
          Checkout
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Delivery Address
      </Text>

      {addresses.length === 0 ? (
        <View style={styles.emptyAddress}>
          <Text style={styles.emptyText}>
            You don't have any saved addresses.
          </Text>

          <Pressable
            style={styles.addressButton}
            onPress={() => router.push('/addresses')}
          >
            <Text style={styles.addressButtonText}>
              Add Address
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.addressList}
          renderItem={({ item }) => {
            const selected =
              selectedAddress?.id === item.id;

            return (
              <Pressable
                style={[
                  styles.addressCard,
                  selected &&
                  styles.addressCardSelected,
                ]}
                onPress={() =>
                  setSelectedAddress(item)
                }
              >
                <Text style={styles.addressLabel}>
                  {item.label}
                </Text>

                <Text style={styles.addressDescription}>
                  {item.description}
                </Text>

                {selected && (
                  <Text style={styles.selectedText}>
                    ✓ Selected
                  </Text>
                )}
              </Pressable>
            );
          }}
        />
      )}

      <Text style={styles.sectionTitle}>
        Payment Method
      </Text>

      <View style={styles.paymentContainer}>
        <Pressable
          style={[
            styles.paymentButton,
            paymentMethod === 'CASH' &&
            styles.paymentButtonSelected,
          ]}
          onPress={() =>
            setPaymentMethod('CASH')
          }
        >
          <Text
            style={[
              styles.paymentText,
              paymentMethod === 'CASH' &&
              styles.paymentTextSelected,
            ]}
          >
            Cash
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.paymentButton,
            paymentMethod === 'CREDIT_CARD' &&
            styles.paymentButtonSelected,
          ]}
          onPress={() =>
            setPaymentMethod('CREDIT_CARD')
          }
        >
          <Text
            style={[
              styles.paymentText,
              paymentMethod === 'CREDIT_CARD' &&
              styles.paymentTextSelected,
            ]}
          >
            Credit Card
          </Text>
        </Pressable>
      </View>



      <Text style={styles.sectionTitle}>
        Order Summary
      </Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        style={styles.cartList}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>
                {item.name}
              </Text>

              {item.optionName ? (
                <Text style={styles.optionName}>
                  Option: {item.optionName}
                </Text>
              ) : null}

              <Text style={styles.itemQuantity}>
                Quantity: {item.quantity}
              </Text>

              <Text style={styles.itemUnitPrice}>
                {getItemUnitPrice(item).toFixed(2)}
              </Text>
            </View>

            <Text style={styles.itemTotal}>
              ${getItemTotal(item).toFixed(2)}
            </Text>
          </View>
        )}
      />



      <View style={styles.bottomContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.total}>
            ${total.toFixed(2)}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Customer Note
        </Text>

        <TextInput
          style={styles.noteInput}
          placeholder="Add a note for the restaurant (optional)"
          placeholderTextColor="#999"
          value={customerNote}
          onChangeText={setCustomerNote}
          multiline
        />

        <Pressable
          style={[
            styles.placeOrderButton,
            placingOrder &&
            styles.placeOrderButtonDisabled,
          ]}
          onPress={handlePlaceOrder}
          disabled={placingOrder}
        >
          <Text style={styles.placeOrderText}>
            {placingOrder
              ? 'Placing Order...'
              : 'Place Order'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

