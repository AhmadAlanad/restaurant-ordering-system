import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 20,
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

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  error: {
    color: '#cc0000',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  backButton: {
    marginRight: 18,
    paddingVertical: 6,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
  },

  scrollContent: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  orderId: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
  },

  status: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },

  statusPending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },

  statusAccepted: {
    backgroundColor: '#d1e7dd',
    color: '#0f5132',
  },

  statusPreparing: {
    backgroundColor: '#cff4fc',
    color: '#055160',
  },

  statusReady: {
    backgroundColor: '#d1e7dd',
    color: '#0f5132',
  },

  statusDelivered: {
    backgroundColor: '#d1e7dd',
    color: '#0f5132',
  },

  statusRejected: {
    backgroundColor: '#f8d7da',
    color: '#842029',
  },

  statusDefault: {
    backgroundColor: '#e2e3e5',
    color: '#41464b',
  },

  dateContainer: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },

  dateLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 3,
  },

  dateText: {
    fontSize: 14,
    color: '#555555',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },

  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },

  itemName: {
    fontSize: 16,
    fontWeight: '700',
  },

  optionName: {
    fontSize: 13,
    color: '#777777',
    marginTop: 3,
  },

  itemPrice: {
    fontSize: 13,
    color: '#666666',
    marginTop: 5,
  },

  itemRight: {
    alignItems: 'flex-end',
    minWidth: 70,
  },

  itemQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
  },

  itemSubtotal: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 5,
  },

  infoText: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 21,
  },

  addressLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },

  addressDescription: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 21,
  },

  rejectionCard: {
    backgroundColor: '#fff1f2',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f5c2c7',
  },

  rejectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#842029',
    marginBottom: 6,
  },

  rejectionText: {
    fontSize: 15,
    color: '#842029',
    lineHeight: 21,
  },

  totalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
  },

  total: {
    fontSize: 22,
    fontWeight: '700',
  },

  button: {
    backgroundColor: '#222222',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  orderDate: {
    fontSize: 14,
    color: '#777777',
    marginTop: 4,
  },

  progressContainer: {
    paddingTop: 10,
  },

  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
  },

  progressCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  progressCircleCompleted: {
    backgroundColor: '#d1e7dd',
    borderColor: '#198754',
  },

  progressCircleCurrent: {
    borderWidth: 3,
  },

  progressCircleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999999',
  },

  progressCircleTextCompleted: {
    color: '#198754',
  },

  progressLabel: {
    fontSize: 15,
    color: '#777777',
    marginLeft: 12,
  },

  progressLabelCurrent: {
    fontWeight: '700',
    color: '#222222',
  },

  progressLine: {
    position: 'absolute',
    left: 14,
    top: 40,
    width: 2,
    height: 30,
    backgroundColor: '#dddddd',
  },

  progressLineCompleted: {
    backgroundColor: '#198754',
  },

  rejectedStatus: {
    fontSize: 17,
    fontWeight: '700',
    color: '#842029',
    marginBottom: 8,
  },

  rejectionReason: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },

  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
});