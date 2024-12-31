import { Link, Stack } from "expo-router";

import React from "react";
import { View } from "react-native";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Ooops! Not found page",
        }}
      />
      <View>
        <Link href={"/"}>Go to Home</Link>
      </View>
    </>
  );
};

export default NotFoundScreen;
