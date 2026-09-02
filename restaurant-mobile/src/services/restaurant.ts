import api from '@/services/api';

export async function getRestaurantStatus() {
  const response = await api.get('/restaurant/status');

  return response.data;
}