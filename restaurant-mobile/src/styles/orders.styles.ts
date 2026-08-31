import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  backButton: {
    marginRight: 25,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  list: {
    paddingBottom: 30,
  },

  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
  },

  orderCardPressed: {
    opacity: 0.7,
  },

  orderHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 13,
  marginBottom: 15,
  borderRadius: 10,
},

  orderTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  status: {
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },

  statusPending: {
    backgroundColor: '#fdfdfd',
    color: '#856404',
  },

  statusAccepted: {
    backgroundColor: '#fdfdfd',
    color: '#0f5132',
  },

  statusPreparing: {
    backgroundColor: '#ffffff',
    color: '#055160',
  },

  statusReady: {
    backgroundColor: '#ffffff',
    color: '#0f5132',
  },

  statusDelivered: {
    backgroundColor: '#f7faf8',
    color: '#0f5132',
  },

  statusRejected: {
    backgroundColor: '#fdfdfd',
    color: '#9e101c',
  },

  
orderHeaderPending: {
  backgroundColor: '#e9c44a',
},

orderHeaderAccepted: {
  backgroundColor: '#35d68e',
},

orderHeaderPreparing: {
  backgroundColor: '#cff4fc',
},

orderHeaderReady: {
  backgroundColor: '#d1e7dd',
},

orderHeaderDelivered: {
  backgroundColor: '#35d68e',
},

orderHeaderRejected: {
  backgroundColor: '#fc2c3d',
},

orderHeaderDefault: {
  backgroundColor: '#e2e3e5',
},


  statusDefault: {
    backgroundColor: '#e2e3e5',
    color: '#41464b',
  },

  summaryRow: {
    marginBottom: 12,
  },

  itemCount: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },

  orderDate: {
    fontSize: 13,
    color: '#777777',
  },

  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    marginTop: 5,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 17,
    fontWeight: '700',
  },

  total: {
    fontSize: 17,
    fontWeight: '700',
  },

  detailsText: {
    textAlign: 'right',
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },

  error: {
    color: '#cc0000',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#222222',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});