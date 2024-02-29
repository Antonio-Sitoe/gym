import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { NativeBaseProvider, theme, useTheme } from "native-base";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, Tabs } from "expo-router";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { THEME } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStorage, useAuth } from "@/contexts/AuthContext";

import Home from "@/assets/home.svg";
import HistorySvg from "@/assets/history.svg";
import ProfileSvg from "@/assets/profile.svg";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    return null;
  }

  return (
    <AuthStorage>
      <RootLayoutNav />
    </AuthStorage>
  );
}

function RootLayoutNav() {
  const { user } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.gray[700] }}>
      <NativeBaseProvider theme={THEME}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        {user.id ? (
          <AuthTab />
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="tabs" />
          </Stack>
        )}
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

function AuthTab() {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[6];

  return (
    <>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarActiveTintColor: "red",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: colors.gray[200],
          tabBarStyle: {
            backgroundColor: colors.gray[600],
            borderTopWidth: 0,
            height: Platform.OS === "android" ? "auto" : 96,
            paddingBottom: sizes[10],
            paddingTop: sizes[6],
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color }) => (
              <Home fill={color} width={iconSize} height={iconSize} />
            ),
          }}
        />
        <Tabs.Screen
          name="History"
          options={{
            tabBarIcon: ({ color }) => (
              <HistorySvg fill={color} width={iconSize} height={iconSize} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color }) => (
              <ProfileSvg fill={color} width={iconSize} height={iconSize} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
