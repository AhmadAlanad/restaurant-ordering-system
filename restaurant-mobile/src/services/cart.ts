import { getUser } from '@/services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getCartKey() {
  const user = await getUser();

  if (!user?.id) {
    throw new Error('User is not logged in.');
  }

  return `cart_${user.id}`;
}

export async function getCart() {
  const cartKey = await getCartKey();

  const cart = await AsyncStorage.getItem(cartKey);

  if (!cart) {
    return [];
  }

  return JSON.parse(cart);
}

export async function saveCart(cart: any[]) {
  const cartKey = await getCartKey();

  await AsyncStorage.setItem(
    cartKey,
    JSON.stringify(cart)
  );
}

export async function clearCart() {
  const cartKey = await getCartKey();

  await AsyncStorage.removeItem(cartKey);
}
