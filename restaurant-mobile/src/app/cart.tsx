import { styles } from '@/styles/cart.styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  View
} from 'react-native';

import { clearCart, getCart, saveCart } from '@/services/cart';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  optionId?: string | null;
  optionName?: string | null;
  optionPrice?: number;
  imageUrl?: string;
};

export default function CartScreen() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const storedCart = await getCart();
    setCart(storedCart);
  };

  const increaseQuantity = async (
    id: string,
    optionId?: string | null
  ) => {
    const updatedCart = cart.map((item) =>
      item.id === id &&
        item.optionId === (optionId ?? null)
        ? {
          ...item,
          quantity: item.quantity + 1,
        }
        : item
    );

    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const decreaseQuantity = async (
    id: string,
    optionId?: string | null
  ) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id &&
          item.optionId === (optionId ?? null)
          ? {
            ...item,
            quantity: item.quantity - 1,
          }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const handleClearCart = async () => {
    await clearCart();

    setCart([]);

    Alert.alert(
      'Cart cleared',
      'Your cart is now empty.'
    );
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/home');
            }
          }}
        >
          <Text style={styles.back}>← Home</Text>
        </Pressable>

        <Text style={styles.title}>
          Cart
        </Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Your cart is empty
          </Text>

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
            keyExtractor={(item, index) =>
              `${item.id}-${item.optionId ?? 'no-option'}-${index}`
            }
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                {item.imageUrl ? (
                  <Image
                    source={{
                      uri: `http://localhost:8081/images/${item.imageUrl}`,
                    }}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                ) : null}
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>
                    {item.name}
                  </Text>

                  {item.optionName ? (
                    <Text style={styles.optionName}>
                      Option: {item.optionName}
                    </Text>
                  ) : null}

                  <Text style={styles.itemPrice}>
                    {getItemUnitPrice(item).toFixed(2)}
                    {' '}
                  </Text>
                </View>

                <View style={styles.rightSection}>
                  <View style={styles.quantityContainer}>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() =>
                        decreaseQuantity(
                          item.id,
                          item.optionId
                        )
                      }
                    >
                      <Text style={styles.quantityText}>
                        −
                      </Text>
                    </Pressable>

                    <Text style={styles.quantity}>
                      {item.quantity}
                    </Text>

                    <Pressable
                      style={styles.quantityButton}
                      onPress={() =>
                        increaseQuantity(
                          item.id,
                          item.optionId
                        )
                      }
                    >
                      <Text style={styles.quantityText}>
                        +
                      </Text>
                    </Pressable>
                  </View>

                  <Text style={styles.itemTotal}>
                    ${getItemTotal(item).toFixed(2)}
                  </Text>
                </View>
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

            <Pressable
              style={styles.checkoutButton}
              onPress={() =>
                router.push('/checkout')
              }
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


