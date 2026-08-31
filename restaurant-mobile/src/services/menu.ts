import api from '@/services/api';

export async function getMenuItems() {
  const response = await api.get('/menu-items');

  return response.data;
}
