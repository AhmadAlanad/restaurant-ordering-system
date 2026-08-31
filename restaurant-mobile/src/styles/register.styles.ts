import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },

  logo: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 7,
    color: '#333333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },

  registerButton: {
    backgroundColor: '#222222',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  loginLinkButton: {
    alignItems: 'center',
    marginTop: 20,
  },

  loginText: {
    fontSize: 14,
    color: '#666666',
  },

  loginLink: {
    color: '#222222',
    fontWeight: '700',
  },


errorBox: {
  backgroundColor: '#fff3cd',
  borderWidth: 1,
  borderColor: '#ffecb5',
  borderRadius: 8,
  padding: 10,
  marginBottom: 15,
},

errorText: {
  color: '#cc0000',
  fontSize: 13,
  marginTop: 5,
},

inputError: {
  borderWidth: 1,
  borderColor: '#cc0000',
},


});