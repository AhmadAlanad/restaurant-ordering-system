import api from '@/services/api';

export async function getNotifications() {
  const response = await api.get('/notifications');

  return response.data;
}

export async function getUnreadNotifications() {
  const response = await api.get('/notifications/unread');

  return response.data;
}

export async function markNotificationAsRead(
  notificationId: string
) {
  await api.put(
    `/notifications/${notificationId}/read`
  );
}