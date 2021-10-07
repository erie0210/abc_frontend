import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bakery from "./components/Bakery/Container";
import BakeryDetailed from "./components/BakeryDetailed";
import Calculator from "./components/Calculator/Container";
import PersonalDetailed from "./components/PersonalDetailed";
import Profile from "./components/Profile";
import PublicDetailed from "./components/PublicDetailed";
import PublicRecipes from "./components/PublicRecipes/Container";
import Register from "./components/Register";
import SNS from "./components/SNS";
import Tab from "./Tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default Basic = () => {
  const [userInfo, setUserInfo] = useState(false);
  const [ready, setReady] = useState(false);
  const loadAssets = async () => {
    const loginInfo = await AsyncStorage.getItem("UserInfo");
    setUserInfo(loginInfo);
    // console.log("loginInfo: ", loginInfo, userInfo);
    // try {
    // const result = await AsyncStorage.getItem("USER_INFO");
    // if (result !== null) {
    //   const USER_INFO = JSON.parse(result);
    //   setUserInfo(USER_INFO);
    //   }
    // } catch (e) {
    //   console.warn(e);
    // }
  };
  const onFinish = () => {
    setReady(true);
  };

  return ready ? (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
      }}
    >
      {userInfo ? (
        <>
          <Stack.Screen name="Tab" component={Tab} />
          <Stack.Screen name="PublicRecipes" component={PublicRecipes} />
          <Stack.Screen name="PublicDetailed" component={PublicDetailed} />
          <Stack.Screen name="Calculator" component={Calculator} />
          <Stack.Screen name="PersonalDetailed" component={PersonalDetailed} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SNS" component={SNS} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Bakery" component={Bakery} />
          <Stack.Screen name="BakeryDetailed" component={BakeryDetailed} />
        </>
      ) : (
        <>
          <Stack.Screen name="SNS" component={SNS} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Tab" component={Tab} />
          <Stack.Screen name="PublicRecipes" component={PublicRecipes} />
          <Stack.Screen name="PublicDetailed" component={PublicDetailed} />
          <Stack.Screen name="Calculator" component={Calculator} />
          <Stack.Screen name="PersonalDetailed" component={PersonalDetailed} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Bakery" component={Bakery} />
        </>
      )}
    </Stack.Navigator>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.warn}
    />
  );
};
