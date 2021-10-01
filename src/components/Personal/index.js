import * as Font from "expo-font";

import { ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { cachePrivateReicpe, getPrivateRecipeData } from "../../../apis";

import AppLoading from "expo-app-loading";
import PersonalPresentation from "./Presentation";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;

export default CalculatorContainer = () => {
  const [ready, setReady] = useState(false);
  const [recipes, setRecipes] = useState({
    loading: false,
    recipes: [],
    recipesError: null,
    USER_INFO: null,
  });

  const getData = async () => {
    const res = await getPrivateRecipeData("star", 1);
    // console.log("cachePrivateReicpe", res);
    setRecipes({
      loading: false,
      recipes: res,
      recipesError: null,
    });
    setReady(true);
  };

  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("focus", () => getData());
  }, []);

  return ready ? (
    <PersonalPresentation refreshFn={getData} {...recipes} />
  ) : (
    <Wrapper>
      <ActivityIndicator color="#BB6767" size="large" />
    </Wrapper>
  );
};
