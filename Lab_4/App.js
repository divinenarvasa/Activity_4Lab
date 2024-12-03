import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  FlatList,
  Switch,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import MyPicture from './assets/profile.jpg';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Animated Header Component
function AnimatedHeader() {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
      <Text style={styles.headerText}>Hello, Divine!</Text>
    </Animated.View>
  );
}

// Home Screen with Updated Content and Animation
function HomeScreen() {
  const [scaleAnim] = useState(new Animated.Value(1));

  const onPressButton = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      friction: 2,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Image
        source={MyPicture}
        style={[styles.profilePicture, styles.fadeIn]}
      />
      <AnimatedHeader />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Highlights</Text>
        <View style={styles.dashboard}>
          <Text style={styles.dashboardItem}>
            <Ionicons name="calendar-outline" size={20} color="#33C3A5" /> Events Today: 3
          </Text>
          <Text style={styles.dashboardItem}>
            <MaterialCommunityIcons name="message-outline" size={20} color="#33C3A5" /> Unread Messages: 4
          </Text>
          <Text style={styles.dashboardItem}>
            <AntDesign name="clockcircleo" size={20} color="#33C3A5" /> Time Left for Next Task: 1 hr
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPressButton}>
          <Animated.Text style={[styles.buttonText, { transform: [{ scale: scaleAnim }] }]}>
            Discover More
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Profile Screen with Updated Content and Animations
// Profile Screen with Updated Content and Animations
function ProfileScreen() {
  const [name, setName] = useState('Divine Anne Narvasa');
  const [age, setAge] = useState('21');
  const [birthdate, setBirthdate] = useState('November 12, 2003');
  const [nationality, setNationality] = useState('Filipino');
  const [gender, setGender] = useState('Female');

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Image source={MyPicture} style={[styles.profilePicture, { opacity: fadeAnim }]} />
      <Text style={styles.heading}>Update Your Details</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Full Name" />
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
      <TextInput style={styles.input} value={birthdate} onChangeText={setBirthdate} placeholder="Birthdate" />
      <TextInput style={styles.input} value={nationality} onChangeText={setNationality} placeholder="Nationality" />
      <TextInput style={styles.input} value={gender} onChangeText={setGender} placeholder="Gender" />
      <TouchableOpacity style={styles.button} onPress={() => alert('Profile Updated!')}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


// Settings Screen with Bounce Animation and Updated Content
function SettingsScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [bounceAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: isDarkTheme ? 1.2 : 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [isDarkTheme]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.info}>
          <MaterialCommunityIcons name="theme-light-dark" size={20} color="#33C3A5" /> Dark Mode:
        </Text>
        <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />
      </View>
      <Animated.View
        style={[
          styles.settingsBox,
          {
            transform: [
              {
                scale: bounceAnim,
              },
            ],
          },
        ]}
      >
        <Text style={styles.info}>
          <Ionicons name={isDarkTheme ? 'moon' : 'sunny'} size={20} color={isDarkTheme ? '#fff' : '#333'} />
          Current Theme: {isDarkTheme ? 'Dark' : 'Light'}
        </Text>
      </Animated.View>
    </View>
  );
}

// Dashboard Screen with Animated List and New Content
function DashboardScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.heading}>Overview</Text>
      <Text style={styles.info}>Check out your recent activities and updates.</Text>
      <FlatList
        data={[
          { key: 'Complete a new project plan' },
          { key: 'Attend team meeting' },
          { key: 'Read new research article' },
        ]}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>
              <Ionicons name="checkmark-circle" size={20} color="#33C3A5" /> {item.key}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </Animated.View>
  );
}

// Tab Navigator with Updated Icons and Content
function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          else if (route.name === 'Dashboard') iconName = 'stats-chart-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#33C3A5',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: { backgroundColor: '#D1E8E2' },
        headerStyle: {
          backgroundColor: '#33C3A5',
        },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
}

// Custom Drawer Content with Updated Icons
function CustomDrawerContent({ navigation }) {
  return (
    <View style={styles.drawerContainer}>
      <Image source={MyPicture} style={styles.drawerImage} />
      <Text style={styles.drawerName}>Zoe Mart Derick R. Pabillaran</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
        <Text style={styles.drawerItem}>
          <Ionicons name="home-outline" size={20} color="#33C3A5" /> Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.drawerItem}>
          <MaterialCommunityIcons name="cogs" size={20} color="#33C3A5" /> Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.drawerItem}>
          <Ionicons name="person-outline" size={20} color="#33C3A5" /> Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Tabs" component={TabsNavigator} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Styles with updated colors and modern design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FCF9',
    padding: 15,
  },
  header: {
    backgroundColor: '#33C3A5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dashboard: {
    marginBottom: 20,
  },
  dashboardItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#33C3A5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#33C3A5',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginRight: 10,
  },
  settingsBox: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  drawerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#D1E8E2',
  },
  drawerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  drawerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  drawerItem: {
    fontSize: 18,
    marginBottom: 15,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
});
