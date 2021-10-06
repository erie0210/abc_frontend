import * as Font from "expo-font";

import { ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { getBakeryData, getPublicRecipeData } from "../../../apis.js";

import AppLoading from "expo-app-loading";
import BakeryPresentor from "./Presentation";
import axios from "axios";
import { store } from "../../../Redux/store";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;

export default BakeryContainer = () => {
  const [ready, setReady] = useState(false);
  const [recipes, setRecipes] = useState({
    loading: false,
    recipes: [],
    recipesError: null,
    USER_INFO: null,
  });

  const getData = async () => {
    const res = await getBakeryData(1);
    // console.log(res);
    setRecipes({
      loading: false,
      recipes: res,
      recipesError: null,
    });
    setReady(true);
  };

  // store.subscribe(() => getData());
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("focus", () => getData());
  }, []);

  return ready ? (
    <BakeryPresentor refreshFn={getData} {...recipes} />
  ) : (
    <Wrapper>
      <ActivityIndicator color="#BB6767" size="large" />
    </Wrapper>
  );
};
