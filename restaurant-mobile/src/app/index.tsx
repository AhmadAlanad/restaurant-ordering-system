import api from '@/services/api';
import { saveAuth } from '@/services/auth';
import { styles } from '@/styles/index.styles';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';


export default function LoginScreen() {
  const { registered } = useLocalSearchParams<{
  registered?: string;
}>();

const [successMessage, setSuccessMessage] =
  useState('');

  useEffect(() => {
  if (registered === 'true') {
    setSuccessMessage(
      'Registration successful! You can now log in.'
    );
  }
}, [registered]);  

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

        {successMessage ? (
          <View style={styles.successMessage}>
            <Text style={styles.successMessageText}>
              {successMessage}
            </Text>
          </View>
        ) : null}

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
          onPress={() => router.push('/register')}
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


