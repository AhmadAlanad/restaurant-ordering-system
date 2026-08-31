import api from '@/services/api';

export async function getUserById(userId: string) {
  const response = await api.get(`/users/${userId}`);
  return response.data;
}

export async function updateUser(
  userId: string,
  data: {
    fullName: string;
    phone: string;
  }
) {
  const response = await api.put(`/users/${userId}`, data);
  return response.data;
}

export async function changePassword(
  userId: string,
  data: {
    currentPassword: string;
    newPassword: string;
  }
) {
  await api.put(
    `/users/${userId}/change-password`,
    data
  );
}