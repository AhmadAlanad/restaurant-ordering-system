import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  welcome: {
    fontSize: 18,
    marginTop: 6,
    color: '#555555',
  },

  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 15,
  },

 headerButton: {
  backgroundColor: '#222222',
  width: 100,
  height: 42,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
},

logoutButton: {
  backgroundColor: '#cc0000',
  width: 100,
  height: 42,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
},

headerButtonText: {
  color: '#ffffff',
  fontWeight: '700',
},

  menuTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
  },

  list: {
    paddingBottom: 30,
  },

  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuInfo: {
    flex: 1,
    paddingRight: 15,
  },

  menuName: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 4,
  },

  category: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },

  price: {
    fontSize: 17,
    fontWeight: '700',
  },

  addButton: {
    backgroundColor: '#222222',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },

  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  error: {
    color: '#cc0000',
    textAlign: 'center',
    marginTop: 30,
  },

  empty: {
    color: '#666666',
    textAlign: 'center',
    marginTop: 30,
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },

  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
  },

  categoryButtonActive: {
    backgroundColor: '#222222',
    borderColor: '#222222',
  },

  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
  },

  categoryTextActive: {
    color: '#ffffff',
  },

  
});