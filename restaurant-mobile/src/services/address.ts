import api from '@/services/api';

export async function getAddresses(userId: string) {
const response = await api.get(`/addresses/${userId}`);
return response.data;
}

export async function addAddress(
userId: string,
address: {
label: string;
latitude: number;
longitude: number;
description: string;
}
) {
const response = await api.post(`/addresses/${userId}`, address);
return response.data;
}

export async function deleteAddress(
userId: string,
addressId: string
) {
await api.delete(`/addresses/${userId}/${addressId}`);
}
