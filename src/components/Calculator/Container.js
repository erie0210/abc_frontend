import * as Font from "expo-font";

import { ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

import CalculatorPresentation from "./Presentation";
import { store } from "../../../Redux/store";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;

export default CalculatorContainer = () => {
  const [ready, setReady] = useState(false);
  const [recipes, setRecipes] = useState({});

  const getData = async () => {
    const res = await store.getState();
    // console.log("res in calculator container res: ", res);
    setRecipes(res);
    setReady(true);
  };
  const navigation = useNavigation();

  store.subscribe(() => {
    getData();
  });
  useEffect(() => {
    navigation.addListener("focus", () => getData());
  }, []);

  return ready ? (
    <CalculatorPresentation refreshFn={getData} {...recipes} />
  ) : (
    <Wrapper>
      <ActivityIndicator color="#BB6767" size="large" />
    </Wrapper>
  );
};
