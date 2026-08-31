import { getToken, getUser, logout } from '@/services/auth';
import { getCart, saveCart } from '@/services/cart';
import { getCategories } from '@/services/category';
import { getMenuItems } from '@/services/menu';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View
} from 'react-native';

import { styles } from '@/styles/home.styles';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  available: boolean;
  category?: {
    id: string;
    name: string;
  };
};

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
  checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = await getToken();

    if (!token) {
      router.replace('/');
      return;
    }

  loadHome();
};

  const loadHome = async () => {
    try {
      const storedUser = await getUser();
      setUser(storedUser);

      const items = await getMenuItems();
      setMenuItems(items);

      const categoriesData = await getCategories();
      setCategories(categoriesData);

      console.log('Categories:', categoriesData);

      const storedCart = await getCart();
      setCart(storedCart);
    } catch (error) {
      console.log('Home error:', error);
      setError('Could not load the menu.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
  console.log('LOGOUT BUTTON PRESSED');

  try {
    await logout();

    console.log('LOGOUT SUCCESS');

    setUser(null);
    setCart([]);

    router.replace('/');
  } catch (error) {
    console.log('Logout error:', error);
  }
};

  const filteredMenuItems =
    selectedCategory === null
      ? menuItems
      : menuItems.filter(
          (item) => item.category?.id === selectedCategory
        );

  const addToCart = async (item: MenuItem) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);
    await saveCart(updatedCart);

    alert(`${item.name} added to cart.`);
  };

  const renderMenuItem = ({
    item,
  }: {
    item: MenuItem;
  }) => {
    return (
      <View style={styles.menuCard}>
        <View style={styles.menuInfo}>
          <Text style={styles.menuName}>
            {item.name}
          </Text>

          {item.category?.name ? (
            <Text style={styles.category}>
              {item.category.name}
            </Text>
          ) : null}

          {item.description ? (
            <Text style={styles.description}>
              {item.description}
            </Text>
          ) : null}

          <Text style={styles.price}>
            ${item.price.toFixed(2)}
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.addButtonText}>
            Add
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Restaurant Ordering
        </Text>

        <Text style={styles.welcome}>
          Welcome
          {user?.fullName
            ? `, ${user.fullName}`
            : ''}
          !
        </Text>

        
<View style={styles.headerButtons}>
  <Pressable
    style={styles.headerButton}
    onPress={() =>
      router.push('/addresses')
    }
  >
    <Text style={styles.headerButtonText}>
      Addresses
    </Text>
  </Pressable>

  <Pressable
    style={styles.headerButton}
    onPress={() =>
      router.push('/orders')
    }
  >
    <Text style={styles.headerButtonText}>
      My Orders
    </Text>
  </Pressable>

  <Pressable
    style={styles.headerButton}
    onPress={() =>
      router.push('/profile')
    }
  >
    <Text style={styles.headerButtonText}>
      Profile
    </Text>
  </Pressable>

  <Pressable
    style={styles.logoutButton}
    onPress={handleLogout}
  >
    <Text style={styles.headerButtonText}>
      Logout
    </Text>
  </Pressable>
</View>

      </View>

      <Text style={styles.menuTitle}>
        Menu
      </Text>

      <Pressable
        style={styles.headerButton}
        onPress={() => router.push('/cart')}
      >
        <Text style={styles.headerButtonText}>
          Cart ({cart.length})
        </Text>
      </Pressable>

      <View style={styles.categoryContainer}>
        <Pressable
          style={[
            styles.categoryButton,
            selectedCategory === null &&
              styles.categoryButtonActive,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === null &&
                styles.categoryTextActive,
            ]}
          >
            All
          </Text>
        </Pressable>

        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id &&
                styles.categoryButtonActive,
            ]}
            onPress={() =>
              setSelectedCategory(category.id)
            }
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id &&
                  styles.categoryTextActive,
              ]}
            >
              {category.name}
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : menuItems.length === 0 ? (
        <Text style={styles.empty}>
          No menu items available.
        </Text>
      ) : (
        <FlatList
          data={filteredMenuItems}
          keyExtractor={(item) => item.id}
          renderItem={renderMenuItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}