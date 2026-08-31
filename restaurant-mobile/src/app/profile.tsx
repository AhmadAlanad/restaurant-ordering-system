import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';

import {
    getToken,
    getUser,
    logout,
    saveAuth,
} from '@/services/auth';

import {
    changePassword,
    getUserById,
    updateUser,
} from '@/services/user';

import { styles } from '@/styles/profile.styles';

type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
};

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const [currentPassword, setCurrentPassword] =
    useState('');
  const [newPassword, setNewPassword] =
    useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] =
    useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Messages
  const [profileMessage, setProfileMessage] =
    useState('');
  const [profileMessageType, setProfileMessageType] =
    useState<'success' | 'error' | ''>('');

  const [passwordMessage, setPasswordMessage] =
    useState('');
  const [passwordMessageType, setPasswordMessageType] =
    useState<'success' | 'warning' | 'error' | ''>('');

  const [logoutMessage, setLogoutMessage] =
    useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedUser = await getUser();

      if (!storedUser) {
        router.replace('/');
        return;
      }

      const profile = await getUserById(storedUser.id);

      setUser(profile);
      setFullName(profile.fullName || '');
      setPhone(profile.phone || '');
    } catch (error: any) {
      console.log(
        'Profile error:',
        error?.response?.data || error
      );

      setProfileMessage(
        'Could not load your profile.'
      );
      setProfileMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) {
      return;
    }

    setProfileMessage('');
    setProfileMessageType('');

    if (!fullName.trim()) {
      setProfileMessage(
        'Please enter your full name.'
      );
      setProfileMessageType('error');
      return;
    }

    if (!phone.trim()) {
      setProfileMessage(
        'Please enter your phone number.'
      );
      setProfileMessageType('error');
      return;
    }

    try {
      setSaving(true);

      console.log(
        'SENDING UPDATE REQUEST'
      );

      const updatedUser = await updateUser(
        user.id,
        {
          fullName: fullName.trim(),
          phone: phone.trim(),
        }
      );

      setUser(updatedUser);

      const token = await getToken();

      if (token) {
        await saveAuth(token, updatedUser);
      }

      setProfileMessage(
        'Your profile has been updated successfully.'
      );
      setProfileMessageType('success');

      console.log(
        'PROFILE UPDATE SUCCESS'
      );
    } catch (error: any) {
      console.log(
        'Update profile error:',
        error?.response?.data || error
      );

      setProfileMessage(
        error?.response?.data?.message ||
          'Could not update your profile.'
      );
      setProfileMessageType('error');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user) {
      return;
    }

    setPasswordMessage('');
    setPasswordMessageType('');

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setPasswordMessage(
        'Please fill in all password fields.'
      );
      setPasswordMessageType('warning');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage(
        'New password and confirmation do not match.'
      );
      setPasswordMessageType('warning');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage(
        'New password must be at least 6 characters.'
      );
      setPasswordMessageType('warning');
      return;
    }

    try {
      setChangingPassword(true);

      console.log(
        'SENDING CHANGE PASSWORD REQUEST'
      );

      await changePassword(user.id, {
        currentPassword,
        newPassword,
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setPasswordMessage(
        'Your password has been changed successfully.'
      );
      setPasswordMessageType('success');

      console.log(
        'PASSWORD CHANGE SUCCESS'
      );
    } catch (error: any) {
      console.log(
        'Change password error:',
        error?.response?.data || error
      );

      setPasswordMessage(
        error?.response?.data?.message ||
          'Could not change your password.'
      );
      setPasswordMessageType('error');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    setLogoutMessage('');

    try {
      setLoggingOut(true);

      console.log(
        'LOGOUT BUTTON PRESSED'
      );

      await logout();

      console.log(
        'LOGOUT SUCCESS'
      );

      router.replace('/');
    } catch (error) {
      console.log(
        'Logout error:',
        error
      );

      setLogoutMessage(
        'Could not logout. Please try again.'
      );

      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading profile...
        </Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.error}>
          User information could not be loaded.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.buttonText}>
            Back to Login
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.backText}>
            ← Home
          </Text>
        </Pressable>

        <Text style={styles.title}>
          Profile
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Profile Information */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Profile Information
          </Text>

          <View style={styles.profileInfo}>
            <Text style={styles.fieldLabel}>
              Email
            </Text>

            <Text
              style={[
                styles.profileValue,
                styles.emailInput,
              ]}
            >
              {user.email}
            </Text>
          </View>

          <Text style={styles.fieldLabel}>
            Full Name
          </Text>

          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              setProfileMessage('');
              setProfileMessageType('');
            }}
            placeholder="Full name"
          />

          <Text style={styles.fieldLabel}>
            Phone
          </Text>

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setProfileMessage('');
              setProfileMessageType('');
            }}
            placeholder="Phone number"
            keyboardType="phone-pad"
          />

          <Pressable
            style={[
              styles.button,
              saving && styles.buttonDisabled,
            ]}
            onPress={handleUpdateProfile}
            disabled={saving}
          >
            <Text style={styles.buttonText}>
              {saving
                ? 'Saving...'
                : 'Save Changes'}
            </Text>
          </Pressable>

          {profileMessage ? (
            <Text
              style={
                profileMessageType === 'success'
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {profileMessage}
            </Text>
          ) : null}
        </View>

        {/* Change Password */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Change Password
          </Text>

          <Text style={styles.fieldLabel}>
            Current Password
          </Text>

          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={(text) => {
              setCurrentPassword(text);
              setPasswordMessage('');
              setPasswordMessageType('');
            }}
            placeholder="Current password"
            secureTextEntry
          />

          <Text style={styles.fieldLabel}>
            New Password
          </Text>

          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              setPasswordMessage('');
              setPasswordMessageType('');
            }}
            placeholder="New password"
            secureTextEntry
          />

          <Text style={styles.fieldLabel}>
            Confirm New Password
          </Text>

          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);

              if (
                newPassword &&
                text &&
                newPassword !== text
              ) {
                setPasswordMessage(
                  'New password and confirmation do not match.'
                );
                setPasswordMessageType('warning');
              } else {
                setPasswordMessage('');
                setPasswordMessageType('');
              }
            }}
            placeholder="Confirm new password"
            secureTextEntry
          />

          {passwordMessage ? (
            <Text
              style={
                passwordMessageType === 'success'
                  ? styles.successMessage
                  : passwordMessageType === 'warning'
                  ? styles.warningMessage
                  : styles.errorMessage
              }
            >
              {passwordMessage}
            </Text>
          ) : null}

          <Pressable
            style={[
              styles.passwordButton,
              changingPassword &&
                styles.buttonDisabled,
            ]}
            onPress={handleChangePassword}
            disabled={changingPassword}
          >
            <Text
              style={styles.passwordButtonText}
            >
              {changingPassword
                ? 'Changing Password...'
                : 'Change Password'}
            </Text>
          </Pressable>
        </View>

        {/* Logout */}

        <View style={styles.card}>
          {logoutMessage ? (
            <Text style={styles.errorMessage}>
              {logoutMessage}
            </Text>
          ) : null}

          <Pressable
            style={[
              styles.logoutButton,
              loggingOut && styles.buttonDisabled,
            ]}
            onPress={handleLogout}
            disabled={loggingOut}
          >
            <Text style={styles.logoutText}>
              {loggingOut
                ? 'Logging out...'
                : 'Logout'}
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </View>
  );
}