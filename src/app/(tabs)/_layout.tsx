import { Tabs } from "expo-router";
import { useTheme } from "native-base";

import Home from "@/assets/home.svg";
import HistorySvg from "@/assets/history.svg";
import ProfileSvg from "@/assets/profile.svg";
import { Platform, StatusBar } from "react-native";

export default function TabLayout() {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[6];

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Tabs
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
          name="index"
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
        <Tabs.Screen
          name="Exercicies"
          options={{
            tabBarButton: () => null,
          }}
        />
      </Tabs>
    </>
  );
}
