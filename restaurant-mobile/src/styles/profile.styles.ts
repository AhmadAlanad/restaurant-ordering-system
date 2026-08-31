import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
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

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 14,
  },

  emailInput: {
    color: '#777777',
  },

  button: {
    backgroundColor: '#222222',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  passwordButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#222222',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  passwordButtonText: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '700',
  },

  logoutButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cc0000',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  logoutText: {
    color: '#cc0000',
    fontSize: 16,
    fontWeight: '700',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },

  error: {
    color: '#cc0000',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 15,
  },

  profileInfo: {
    marginBottom: 5,
  },

  profileValue: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 12,
  },

 
successMessage: {
  marginTop: 12,
  padding: 10,
  borderRadius: 8,
  backgroundColor: '#d1e7dd',
  color: '#0f5132',
  fontSize: 14,
  fontWeight: '600',
  textAlign: 'center',
},

warningMessage: {
  marginTop: 12,
  padding: 10,
  borderRadius: 8,
  backgroundColor: '#fff3cd',
  color: '#856404',
  fontSize: 14,
  fontWeight: '600',
  textAlign: 'center',
},

errorMessage: {
  marginTop: 12,
  padding: 10,
  borderRadius: 8,
  backgroundColor: '#f8d7da',
  color: '#842029',
  fontSize: 14,
  fontWeight: '600',
  textAlign: 'center',
},

});