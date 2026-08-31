import api from '@/services/api';

export async function placeOrder(order: {
  userId: string;
  items: {
    menuItemId: string;
    optionId?: string | null;
    quantity: number;
  }[];
  paymentMethod: string;
  latitude?: number | null;
  longitude?: number | null;
  addressDescription?: string;
  addressLabel?: string;
  customerNote?: string;
}) {
  const response = await api.post('/orders', order);

  return response.data;
}
