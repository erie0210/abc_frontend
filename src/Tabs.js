import { AntDesign } from "@expo/vector-icons";
import Bakery from "./components/Bakery";
import Calculator from "./components/Calculator/Container";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Personal from "./components/Personal";
import PublicRecipes from "./components/PublicRecipes/Container";
import React from "react";
import Search from "./components/Search";
import { SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styled from "styled-components/native";

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
`;

const Tab = createBottomTabNavigator();

export default Basic = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          if (route.name === "Recipes") {
            return <SimpleLineIcons name="note" size={24} color="black" />;
          } else if (route.name === "Bakery") {
            return <AntDesign name="isv" size={24} color="black" />;
          } else if (route.name === "Calculator") {
            return (
              <SimpleLineIcons name="calculator" size={24} color="black" />
            );
          } else if (route.name === "Personal") {
            return <AntDesign name="smileo" size={24} color="black" />;
          } else {
            return <AntDesign name="search1" size={24} />;
          }
        },
        activeTintColor: "#F4C8AC",
        inactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Calculator" component={Calculator} />
      <Tab.Screen name="Recipes" component={PublicRecipes} />
      <Tab.Screen name="Bakery" component={Bakery} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Personal" component={Personal} />
    </Tab.Navigator>
  );
};
