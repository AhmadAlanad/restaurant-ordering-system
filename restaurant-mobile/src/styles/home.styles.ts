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
  flexWrap: 'wrap',
  gap: 10,
  marginTop: 15,
},

 headerButton: {
  backgroundColor: '#222222',
  flex: 1,
  minWidth: '45%',
  height: 42,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
},

logoutButton: {
  backgroundColor: '#cc0000',
  flex: 1,
  minWidth: '45%',
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

  menuHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 15,
},

cartButton: {
  backgroundColor: '#222222',
  paddingHorizontal: 16,
  height: 42,
  borderRadius: 10,
  justifyContent: 'center',
},

cartButtonText: {
  color: '#ffffff',
  fontWeight: '700',
},

cartMessage: {
  backgroundColor: '#e8f5e9',
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 14,
  marginBottom: 15,
},

cartMessageText: {
  color: '#2e7d32',
  fontWeight: '600',
},

modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},

optionModal: {
  width: '100%',
  maxWidth: 450,
  backgroundColor: '#ffffff',
  borderRadius: 16,
  padding: 20,
},

modalTitle: {
  fontSize: 22,
  fontWeight: '700',
  marginBottom: 5,
},

modalSubtitle: {
  fontSize: 15,
  color: '#666666',
  marginBottom: 18,
},

optionButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#f5f5f5',
  borderWidth: 1,
  borderColor: '#dddddd',
  borderRadius: 10,
  padding: 14,
  marginBottom: 10,
},

optionButtonSelected: {
  backgroundColor: '#222222',
  borderColor: '#222222',
},

optionInfo: {
  flex: 1,
},

optionName: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333333',
},

optionNameSelected: {
  color: '#ffffff',
},

optionPrice: {
  fontSize: 13,
  color: '#666666',
  marginTop: 3,
},

optionPriceSelected: {
  color: '#ffffff',
},

radio: {
  fontSize: 22,
  marginLeft: 10,
  color: '#ffffff',
},

modalButtons: {
  flexDirection: 'row',
  gap: 10,
  marginTop: 10,
},

cancelButton: {
  flex: 1,
  paddingVertical: 13,
  borderRadius: 10,
  alignItems: 'center',
  backgroundColor: '#eeeeee',
},

cancelButtonText: {
  fontWeight: '700',
  color: '#333333',
},

confirmButton: {
  flex: 1,
  paddingVertical: 13,
  borderRadius: 10,
  alignItems: 'center',
  backgroundColor: '#222222',
},

confirmButtonDisabled: {
  opacity: 0.4,
},

confirmButtonText: {
  color: '#ffffff',
  fontWeight: '700',
},
  
});