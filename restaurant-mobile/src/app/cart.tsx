import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { clearCart, getCart, saveCart } from '@/services/cart';

export default function CartScreen() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const storedCart = await getCart();
    setCart(storedCart);
  };

  const increaseQuantity = async (id: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const decreaseQuantity = async (id: string) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const handleClearCart = async () => {
    await clearCart();
    setCart([]);
    Alert.alert('Cart cleared', 'Your cart is now empty.');
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('/home')}>
            <Text style={styles.back}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Cart</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>

          <Pressable
            style={styles.continueButton}
            onPress={() => router.replace('/home')}
          >
            <Text style={styles.buttonText}>
              Continue Shopping
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>
                    {item.name}
                  </Text>

                  <Text style={styles.itemPrice}>
                    ${item.price.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.quantityContainer}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    <Text style={styles.quantityText}>−</Text>
                  </Pressable>

                  <Text style={styles.quantity}>
                    {item.quantity}
                  </Text>

                  <Pressable
                    style={styles.quantityButton}
                    onPress={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          <View style={styles.bottomContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>

              <Text style={styles.total}>
                ${total.toFixed(2)}
              </Text>
            </View>

            <Pressable
              style={styles.checkoutButton}
              onPress={() => router.push('/checkout')}
            >
              <Text style={styles.buttonText}>
                Checkout
              </Text>
            </Pressable>

            <Pressable
              style={styles.clearButton}
              onPress={handleClearCart}
            >
              <Text style={styles.clearText}>
                Clear Cart
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  back: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },

  continueButton: {
    backgroundColor: '#222222',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  cartItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
  },

  itemPrice: {
    fontSize: 14,
    color: '#666666',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  quantityButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },

  quantity: {
    fontSize: 16,
    fontWeight: '700',
  },

  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingTop: 18,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
  },

  total: {
    fontSize: 20,
    fontWeight: '700',
  },

  checkoutButton: {
    backgroundColor: '#222222',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  clearButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  clearText: {
    color: '#cc0000',
    fontSize: 14,
    fontWeight: '600',
  },
});