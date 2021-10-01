import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import React from "react";
import Stack from "./src/Stack";
import { store } from "./Redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </Provider>
  );
}
