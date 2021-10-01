import * as Font from "expo-font";

import { Dimensions, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";

import AppLoading from "expo-app-loading";
import Btn from "./BtnContainer";
import Ingredients from "./IngredientsContainer";
import Save from "./SaveContainer";
import Total from "./TotalContainer";
import { connect } from "react-redux";
import { store } from "../../../Redux/store";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;

const CalculatorPresentation = (recipes) => {
  // console.log("presentation", recipes);
  // console.log("TRAY", recipes.TRAY);
  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  useEffect(() => {}, []);

  if (loaded) {
    return (
      <Wrapper>
        <Save {...recipes} />
        <Total {...recipes} />
        <Ingredients {...recipes} />
        <Btn />
      </Wrapper>
    );
  } else {
    return (
      <AppLoading
        startAsync={loadAssets}
        onFinish={onFinish}
        onError={console.warn}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return { state: state };
};

export default connect(mapStateToProps)(CalculatorPresentation);
