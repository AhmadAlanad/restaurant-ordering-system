import { styles } from '@/styles/addresses.styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';

import {
  addAddress,
  deleteAddress,
  getAddresses,
} from '@/services/address';
import { getUser } from '@/services/auth';

type Address = {
id: string;
label: string;
latitude: number;
longitude: number;
description: string;
};

export default function AddressesScreen() {
const [user, setUser] = useState<any>(null);
const [addresses, setAddresses] = useState<Address[]>([]);
const [loading, setLoading] = useState(true);

const [label, setLabel] = useState('');
const [description, setDescription] = useState('');

const [latitude, setLatitude] = useState('');
const [longitude, setLongitude] = useState('');

const [adding, setAdding] = useState(false);

useEffect(() => {
loadAddresses();
}, []);

const loadAddresses = async () => {
try {
const storedUser = await getUser();


  if (!storedUser) {
    router.replace('/');
    return;
  }

  setUser(storedUser);

  const data = await getAddresses(storedUser.id);
  setAddresses(data);
} catch (error) {
  console.log('Address error:', error);
  Alert.alert('Error', 'Could not load addresses.');
} finally {
  setLoading(false);
}


};

const getCurrentLocation = () => {
navigator.geolocation.getCurrentPosition(
(position) => {
setLatitude(position.coords.latitude.toString());
setLongitude(position.coords.longitude.toString());


    Alert.alert(
      'Location selected',
      'Your current location has been added.'
    );
  },
  (error) => {
    console.log('Location error:', error);
    Alert.alert(
      'Location Error',
      'Could not get your current location.'
    );
  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 10000,
  }
);


};

const handleAddAddress = async () => {
if (!label.trim()) {
Alert.alert('Error', 'Please enter an address label.');
return;
}


if (!description.trim()) {
  Alert.alert('Error', 'Please enter an address description.');
  return;
}

if (!latitude || !longitude) {
  Alert.alert(
    'Error',
    'Please select your current location first.'
  );
  return;
}

try {
  setAdding(true);

  const newAddress = await addAddress(user.id, {
    label: label.trim(),
    description: description.trim(),
    latitude: Number(latitude),
    longitude: Number(longitude),
  });

  setAddresses((current) => [...current, newAddress]);

  setLabel('');
  setDescription('');
  setLatitude('');
  setLongitude('');

  Alert.alert('Success', 'Address added successfully.');
} catch (error: any) {
  console.log('Add address error:', error);

  Alert.alert(
    'Error',
    error.response?.data?.message ||
      'Could not add the address.'
  );
} finally {
  setAdding(false);
}


};

const handleDeleteAddress = async (addressId: string) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this address?'
  );

  if (!confirmed) {
    return;
  }

  try {
    console.log('Deleting address:', addressId);
    console.log('User ID:', user.id);

    await deleteAddress(user.id, addressId);

    setAddresses((current) =>
      current.filter(
        (address) => address.id !== addressId
      )
    );

    window.alert('Address deleted successfully.');
  } catch (error) {
    console.log('Delete address error:', error);

    window.alert('Could not delete the address.');
  }
};

const renderAddress = ({ item }: { item: Address }) => {
  return (
    <View style={styles.addressCard}>
      <Text style={styles.addressLabel}>
        {item.label}
      </Text>

      <Text style={styles.description}>
        {item.description}
      </Text>

      <Text style={styles.coordinates}>
        Latitude: {item.latitude}
      </Text>

      <Text style={styles.coordinates}>
        Longitude: {item.longitude}
      </Text>

      <Pressable
        style={styles.deleteButton}
        onPress={() => handleDeleteAddress(item.id)}
      >
        <Text style={styles.deleteText}>
          Delete
        </Text>
      </Pressable>
    </View>
  );
};

if (loading) {
return ( <View style={styles.loadingContainer}> 
<ActivityIndicator size="large" /> 
</View>
);
}

return ( 
<View style={styles.container}> 
    <View style={styles.header}>
        <Pressable
            onPress={() => router.replace('/home')}
            style={styles.backButton}
        >
            <Text style={styles.back}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Addresses</Text>
    </View>

  <Text style={styles.sectionTitle}>
    Add New Address
  </Text>

  <TextInput
    style={styles.input}
    placeholder="Label (Home, Work...)"
    placeholderTextColor="#999"
    value={label}
    onChangeText={setLabel}
  />

  <TextInput
    style={styles.input}
    placeholder="Address description"
    placeholderTextColor="#999"
    value={description}
    onChangeText={setDescription}
  />

  <Pressable
    style={styles.locationButton}
    onPress={getCurrentLocation}
  >
    <Text style={styles.locationText}>
      📍 Use Current Location
    </Text>
  </Pressable>

  {latitude && longitude ? (
    <View style={styles.locationInfo}>
      <Text style={styles.locationTextSmall}>
        Location selected
      </Text>

      <Text style={styles.coordinates}>
        {latitude}, {longitude}
      </Text>
    </View>
  ) : null}

  <Pressable
    style={styles.addButton}
    onPress={handleAddAddress}
    disabled={adding}
  >
    <Text style={styles.addButtonText}>
      {adding ? 'Adding...' : 'Add Address'}
    </Text>
  </Pressable>

  <Text style={styles.sectionTitle}>
    Saved Addresses
  </Text>

  {addresses.length === 0 ? (
    <Text style={styles.empty}>
      You don't have any saved addresses.
    </Text>
  ) : (
    <FlatList
      data={addresses}
      keyExtractor={(item) => item.id}
      renderItem={renderAddress}
      contentContainerStyle={styles.list}
    />
  )}
</View>


);
}


