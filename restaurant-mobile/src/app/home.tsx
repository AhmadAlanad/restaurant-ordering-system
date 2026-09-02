import { getToken, getUser, logout } from '@/services/auth';
import { getCart, saveCart } from '@/services/cart';
import { getCategories } from '@/services/category';
import { getMenuItems } from '@/services/menu';
import { getUnreadNotifications } from '@/services/notification';
import { getRestaurantStatus } from '@/services/restaurant';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  View
} from 'react-native';

import { styles } from '@/styles/home.styles';

type MenuItemOption = {
  id: string;
  name: string;
  price: number;
  available: boolean;
};

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
  options?: MenuItemOption[];
};

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] =
    useState<MenuItem | null>(null);
  const [restaurantOpen, setRestaurantOpen] = useState(true);
  const [selectedOption, setSelectedOption] =
    useState<MenuItemOption | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [cartMessage, setCartMessage] = useState('');
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  useEffect(() => {
    checkAuthentication();
  }, []);
  const cartItemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

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

      const restaurantStatus =
        await getRestaurantStatus();

      setRestaurantOpen(restaurantStatus.open);

      const items = await getMenuItems();

      console.log('MENU ITEMS:', JSON.stringify(items, null, 2));

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

  const loadUnreadNotificationCount = async () => {
    try {
      const unreadNotifications = await getUnreadNotifications();

      setUnreadNotificationCount(unreadNotifications.length);
    } catch (error: any) {
      console.log(
        'Unread notifications error:',
        error?.response?.data || error
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUnreadNotificationCount();
    }, [])
  );

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

  const addToCart = async (
    item: MenuItem,
    option?: MenuItemOption
  ) => {
    if (!restaurantOpen) {
      setCartMessage(
        'The restaurant is currently closed.'
      );

      setTimeout(() => {
        setCartMessage('');
      }, 2000);

      return;
    }
    const existingItem = cart.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.optionId === (option?.id ?? null)
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id &&
          cartItem.optionId === (option?.id ?? null)
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
          optionId: option?.id ?? null,
          optionName: option?.name ?? null,
          optionPrice: option?.price ?? 0,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);
    await saveCart(updatedCart);

    const message = option
      ? `✓ ${item.name} (${option.name}) added to cart.`
      : `✓ ${item.name} added to cart.`;

    setCartMessage(message);

    setTimeout(() => {
      setCartMessage('');
    }, 2000);
  };

  const renderMenuItem = ({
    item,
  }: {
    item: MenuItem;
  }) => {
    return (
      < View style={styles.menuCard} >
        {
          item.imageUrl ? (
            <Image
              source={{
                uri: `http://localhost:8081/images/${item.imageUrl}`,
              }}
              style={styles.menuImage}
              resizeMode="cover"
            />
          ) : null
        }

        < View style={styles.menuInfo} >
          <Text style={styles.menuName}>
            {item.name}
          </Text>

          {
            item.category?.name ? (
              <Text style={styles.category}>
                {item.category.name}
              </Text>
            ) : null
          }

          {
            item.description ? (
              <Text style={styles.description}>
                {item.description}
              </Text>
            ) : null
          }

          <Text style={styles.price}>
            ${item.price.toFixed(2)}
          </Text>
        </View >

        <Pressable
          style={[
            styles.addButton,
            !restaurantOpen && styles.addButtonDisabled,
          ]}
          disabled={!restaurantOpen}
          onPress={() => {
            if (item.options && item.options.length > 0) {
              setSelectedItem(item);
              setSelectedOption(null);
            } else {
              addToCart(item);
            }
          }}
        >
          <Text style={styles.addButtonText}>
            {restaurantOpen ? 'Add' : 'Closed'}
          </Text>
        </Pressable>
      </View >
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

        <View
          style={[
            styles.restaurantStatus,
            restaurantOpen
              ? styles.restaurantOpen
              : styles.restaurantClosed,
          ]}
        >
          <Text style={styles.restaurantStatusText}>
            {restaurantOpen
              ? '● Restaurant Open'
              : '● Restaurant Closed'}
          </Text>
        </View>


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
            onPress={() => router.push('/notifications')}
          >
            <View style={styles.notificationButtonContent}>
              <Text style={styles.headerButtonText}>
                🔔 Notifications
              </Text>

              {unreadNotificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {unreadNotificationCount}
                  </Text>
                </View>
              )}
            </View>
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

      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>
          Menu
        </Text>

        <Pressable
          style={styles.cartButton}
          onPress={() => router.push('/cart')}
        >
          <Text style={styles.cartButtonText}>
            Cart ({cartItemCount})
          </Text>
        </Pressable>
      </View>

      {cartMessage ? (
        <View style={styles.cartMessage}>
          <Text style={styles.cartMessageText}>
            {cartMessage}
          </Text>
        </View>
      ) : null}

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

      <Modal
        visible={selectedItem !== null}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setSelectedItem(null);
          setSelectedOption(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.optionModal}>
            <Text style={styles.modalTitle}>
              {selectedItem?.name}
            </Text>

            <Text style={styles.modalSubtitle}>
              Choose an option
            </Text>

            {selectedItem?.options?.map((option) => {
              const selected =
                selectedOption?.id === option.id;

              return (
                <Pressable
                  key={option.id}
                  style={[
                    styles.optionButton,
                    selected &&
                    styles.optionButtonSelected,
                  ]}
                  onPress={() =>
                    setSelectedOption(option)
                  }
                >
                  <View style={styles.optionInfo}>
                    <Text
                      style={[
                        styles.optionName,
                        selected &&
                        styles.optionNameSelected,
                      ]}
                    >
                      {option.name}
                    </Text>

                    <Text
                      style={[
                        styles.optionPrice,
                        selected &&
                        styles.optionPriceSelected,
                      ]}
                    >
                      {option.price.toFixed(2)}
                    </Text>
                  </View>

                  <Text style={styles.radio}>
                    {selected ? '●' : '○'}
                  </Text>
                </Pressable>
              );
            })}

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  setSelectedItem(null);
                  setSelectedOption(null);
                }}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.confirmButton,
                  !selectedOption &&
                  styles.confirmButtonDisabled,
                ]}
                disabled={!selectedOption}
                onPress={() => {
                  if (selectedItem && selectedOption) {
                    addToCart(
                      selectedItem,
                      selectedOption
                    );

                    setSelectedItem(null);
                    setSelectedOption(null);
                  }
                }}
              >
                <Text style={styles.confirmButtonText}>
                  Add to Cart
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}