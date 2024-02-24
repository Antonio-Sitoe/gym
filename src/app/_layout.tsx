import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { Loading } from '../components/Loading';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Loading />;
  }
  return <StackRoutes />;
}

function StackRoutes() {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />;
      <Stack />;
    </NativeBaseProvider>
  );
}
