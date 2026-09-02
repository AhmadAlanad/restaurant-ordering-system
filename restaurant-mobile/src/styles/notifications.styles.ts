import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },

  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },

  backButton: {
    marginBottom: 12,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  list: {
    padding: 16,
    paddingBottom: 30,
  },

  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },

  notificationContent: {
    flex: 1,
  },

  message: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
  },

  unreadMessage: {
    fontWeight: 'bold',
    color: '#111',
  },

  date: {
    marginTop: 8,
    fontSize: 13,
    color: '#888',
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
    marginLeft: 12,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#777',
  },
});