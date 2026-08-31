import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveAuth(token: string, user: any) {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('user', JSON.stringify(user));
}

export async function getToken() {
  return await AsyncStorage.getItem('token');
}

export async function getUser() {
  const user = await AsyncStorage.getItem('user');

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

export async function logout() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
}