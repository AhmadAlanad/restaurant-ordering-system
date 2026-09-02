import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  back: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },

  continueButton: {
    backgroundColor: '#222222',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  cartItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemInfo: {
    flex: 1,
    paddingRight: 15,
  },

  itemName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
  },

  optionName: {
    fontSize: 14,
    color: '#444444',
    marginBottom: 5,
    fontWeight: '600',
  },

  itemPrice: {
    fontSize: 14,
    color: '#666666',
  },

  rightSection: {
    alignItems: 'flex-end',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  quantityButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },

  quantity: {
    fontSize: 16,
    fontWeight: '700',
  },

  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },

  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingTop: 18,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
  },

  total: {
    fontSize: 20,
    fontWeight: '700',
  },

  checkoutButton: {
    backgroundColor: '#222222',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  clearButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  clearText: {
    color: '#cc0000',
    fontSize: 14,
    fontWeight: '600',
  },

  itemImage: {
  width: 70,
  height: 70,
  borderRadius: 10,
  marginRight: 12,
},
});