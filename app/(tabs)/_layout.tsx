import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Fragment } from "react";
export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Dove Mangiamo Oggi",
          //Serve a non permettere di scorrere indietro se sono sulla Home
          headerLeft: () => <Fragment></Fragment>,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={
                focused
                  ? "home-sharp"
                  : "home-outline"
              }
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerTitle: "About",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={
                focused
                  ? "archive-sharp"
                  : "archive-outline"
              }
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
