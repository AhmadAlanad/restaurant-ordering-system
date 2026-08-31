import api from '@/services/api';
import { router } from 'expo-router';
import { useState } from 'react';

import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';

import { styles } from '@/styles/register.styles';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  
const validate = () => {
  const newErrors: typeof errors = {};

  if (!fullName.trim()) {
    newErrors.fullName =
      'Full name is required.';
  } else if (fullName.trim().length < 2) {
    newErrors.fullName =
      'Full name must be at least 2 characters.';
  }

  if (!email.trim()) {
    newErrors.email =
      'Email is required.';
  } else {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      newErrors.email =
        'Please enter a valid email address.';
    }
  }

  if (!phone.trim()) {
    newErrors.phone =
      'Phone number is required.';
  }

  if (!password) {
    newErrors.password =
      'Password is required.';
  } else if (password.length < 6) {
    newErrors.password =
      'Password must be at least 6 characters.';
  }

  if (!confirmPassword) {
    newErrors.confirmPassword =
      'Please confirm your password.';
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword =
      'Passwords do not match.';
  }

  console.log(
    'VALIDATION ERRORS:',
    newErrors
  );

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


  const handleRegister = async () => {
    console.log('REGISTER BUTTON PRESSED');

    // Clear previous server/general error
    setErrors((previous) => ({
      ...previous,
      general: undefined,
    }));

    if (!validate()) {
      console.log('VALIDATION FAILED');
      return;
    }

    console.log('VALIDATION PASSED');
    console.log('SENDING REGISTER REQUEST');

    try {
      setLoading(true);

      const registerData = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        confirmPassword,
      };

      console.log(
        'REGISTER DATA:',
        registerData
      );

      const response = await api.post(
        '/users/register',
        registerData
      );

      console.log(
        'REGISTER RESPONSE:',
        response.data
      );

      /*
       * Registration succeeded.
       *
       * Go back to login and pass a message
       * through the route.
       */
      router.replace({
        pathname: '/',
        params: {
          registered: 'true',
        },
      });
    
    } catch (error: any) {
      console.log(
        'Register error:',
        error?.response?.data || error
      );

      const data = error?.response?.data;

      
      if (data && typeof data === 'object') {
        const newErrors: typeof errors = {};

        if (data.fullName) {
          newErrors.fullName = data.fullName;
        }

        if (data.email) {
          newErrors.email = data.email;
        }

        if (data.phone) {
          newErrors.phone = data.phone;
        }

        if (data.password) {
          newErrors.password = data.password;
        }

        if (data.confirmPassword) {
          newErrors.confirmPassword =
            data.confirmPassword;
        }

        
        if (data?.error === 'Email already exists.') {
            setErrors({
                email: 'This email is already registered.',
            });
            return;
        }

        
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
      }

      /*
       * Fallback error
       */
      setErrors({
        general:
          'Could not create your account. Please try again.',
      });
    } finally {
      setLoading(false);
    }

  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.logo}>
            RESTAURANT
          </Text>

          <Text style={styles.title}>
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Register to start ordering.
          </Text>

          {/* General Error */}

          {errors.general ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {errors.general}
              </Text>
            </View>
          ) : null}

          {/* Full Name */}

          <Text style={styles.label}>
            Full Name
          </Text>

          <TextInput
            style={[
              styles.input,
              errors.fullName &&
                styles.inputError,
            ]}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);

              if (errors.fullName) {
                setErrors((previous) => ({
                  ...previous,
                  fullName: undefined,
                }));
              }
            }}
          />

          {errors.fullName ? (
            <Text style={styles.errorText}>
              {errors.fullName}
            </Text>
          ) : null}

          {/* Email */}

          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            style={[
              styles.input,
              errors.email &&
                styles.inputError,
            ]}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);

              if (errors.email) {
                setErrors((previous) => ({
                  ...previous,
                  email: undefined,
                }));
              }
            }}
          />

          {errors.email ? (
            <Text style={styles.errorText}>
              {errors.email}
            </Text>
          ) : null}

          {/* Phone */}

          <Text style={styles.label}>
            Phone
          </Text>

          <TextInput
            style={[
              styles.input,
              errors.phone &&
                styles.inputError,
            ]}
            placeholder="Enter your phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);

              if (errors.phone) {
                setErrors((previous) => ({
                  ...previous,
                  phone: undefined,
                }));
              }
            }}
          />

          {errors.phone ? (
            <Text style={styles.errorText}>
              {errors.phone}
            </Text>
          ) : null}

          {/* Password */}

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={[
              styles.input,
              errors.password &&
                styles.inputError,
            ]}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);

              if (errors.password) {
                setErrors((previous) => ({
                  ...previous,
                  password: undefined,
                }));
              }
            }}
          />

          {errors.password ? (
            <Text style={styles.errorText}>
              {errors.password}
            </Text>
          ) : null}

          {/* Confirm Password */}

          <Text style={styles.label}>
            Confirm Password
          </Text>

          <TextInput
            style={[
              styles.input,
              errors.confirmPassword &&
                styles.inputError,
            ]}
            placeholder="Confirm your password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);

              if (errors.confirmPassword) {
                setErrors((previous) => ({
                  ...previous,
                  confirmPassword:
                    undefined,
                }));
              }
            }}
          />

          {errors.confirmPassword ? (
            <Text style={styles.errorText}>
              {errors.confirmPassword}
            </Text>
          ) : null}

          {/* Register Button */}

          <Pressable
            style={({ pressed }) => [
              styles.registerButton,
              pressed &&
                styles.buttonPressed,
              loading &&
                styles.buttonDisabled,
            ]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.registerButtonText}>
                Register
              </Text>
            )}
          </Pressable>

          {/* Login */}

          <Pressable
            onPress={() => router.replace('/')}
          >
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginLink}>
                Login
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
