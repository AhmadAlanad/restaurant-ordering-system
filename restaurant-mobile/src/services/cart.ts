import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = 'cart';

export async function getCart() {
  const cart = await AsyncStorage.getItem(CART_KEY);

  if (!cart) {
    return [];
  }

  return JSON.parse(cart);
}

export async function saveCart(cart: any[]) {
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export async function clearCart() {
  await AsyncStorage.removeItem(CART_KEY);
}