import api from '@/services/api';
import { saveAuth } from '@/services/auth';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
if (!email || !password) {
alert('Please enter your email and password.');
return;
}

try {
const response = await api.post('/users/login', {
email: email,
password: password,
});


const { token, user } = response.data;

await saveAuth(token, user);

console.log('Login response:', response.data);
console.log('Authentication saved');

alert('Login successful!');
router.replace('/home');

} catch (error: any) {
console.log('Login error:', error);


if (error.response) {
  alert(
    `Login failed: ${error.response.data?.message || 'Invalid email or password'}`
  );
} else {
  alert('Could not connect to the server.');
}


}
};


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>RESTAURANT</Text>


        <Text style={styles.title}>Restaurant Ordering</Text>

        <Text style={styles.subtitle}>
          Welcome back! Please login to continue.
        </Text>

        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            Alert.alert(
              'Register',
              'Registration screen coming soon.'
            )
          }
        >
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text style={styles.registerLink}>Register</Text>
          </Text>
        </Pressable>
      </View>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 24,
  },

  card: {
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 16,
  },

  logo: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
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
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },

  loginButton: {
    height: 52,
    borderRadius: 10,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  registerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666666',
  },

  registerLink: {
    color: '#222222',
    fontWeight: '700',
  },
});
