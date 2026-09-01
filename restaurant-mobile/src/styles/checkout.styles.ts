import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  backButton: {
    marginRight: 20,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 10,
  },

  addressList: {
    paddingBottom: 5,
  },

  addressCard: {
    width: 220,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
  },

  addressCardSelected: {
    borderWidth: 2,
    borderColor: '#222222',
  },

  addressLabel: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },

  addressDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },

  selectedText: {
    marginTop: 10,
    fontWeight: '700',
  },

  emptyAddress: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },

  emptyText: {
    color: '#666666',
    marginBottom: 15,
    textAlign: 'center',
  },

  addressButton: {
    backgroundColor: '#222222',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },

  addressButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  paymentContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  paymentButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
  },

  paymentButtonSelected: {
    backgroundColor: '#222222',
    borderColor: '#222222',
  },

  paymentText: {
    fontWeight: '600',
    color: '#555555',
  },

  paymentTextSelected: {
    color: '#ffffff',
  },

  noteInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 15,
    marginBottom: 10,
  },

  cartList: {
    marginBottom: 10,
  },

  cartItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemInfo: {
    flex: 1,
    marginRight: 10,
  },

  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },

  itemQuantity: {
    fontSize: 13,
    color: '#666666',
    marginTop: 4,
  },

  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
  },

  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingTop: 15,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
  },

  total: {
    fontSize: 20,
    fontWeight: '700',
  },

  placeOrderButton: {
    backgroundColor: '#222222',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  placeOrderButtonDisabled: {
    opacity: 0.5,
  },

  placeOrderText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },

  optionName: {
    fontSize: 14,
    color: '#444444',
    fontWeight: '600',
    marginTop: 4,
  },

  itemUnitPrice: {
    fontSize: 13,
    color: '#666666',
    marginTop: 4,
  },
});