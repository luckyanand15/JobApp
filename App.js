import React, { useMemo } from 'react';
import {
  Dimensions,
  PixelRatio,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// Responsive sizing scaling helper (Rule 6)
const BASE_WIDTH = 390;
const { width: SCREEN_W } = Dimensions.get('window');
const scale = (size) => (SCREEN_W / BASE_WIDTH) * size;
const r = (size) => Math.round(PixelRatio.roundToNearestPixel(scale(size)));

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const safeAreaInsets = useSafeAreaInsets();

  // Dynamic styles defined via useMemo (Rule 2)
  const containerStyle = useMemo(() => [
    styles.container,
    {
      backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
      paddingTop: safeAreaInsets.top,
      paddingBottom: safeAreaInsets.bottom,
      paddingLeft: safeAreaInsets.left,
      paddingRight: safeAreaInsets.right,
    },
  ], [isDarkMode, safeAreaInsets]);

  const textStyle = useMemo(() => [
    styles.welcomeText,
    {
      color: isDarkMode ? '#FFFFFF' : '#121212',
    },
  ], [isDarkMode]);

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: r(28),
    fontWeight: 'bold',
    letterSpacing: r(0.5),
  },
});

export default App;

