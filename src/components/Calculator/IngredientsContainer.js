import * as Font from "expo-font";

import { Dimensions, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import IngredientElem from "./IngredientsElem";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  height: ${HEIGHT * 0.44}px;
`;

export default Ingredients = (params) => {
  // console.log("params IngerdientContainer", params);
  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  if (loaded) {
    return (
      <Wrapper>
        <ScrollView>
          {params.state.TRAY.map((cur) => (
            <IngredientElem key={cur.id} {...cur} />
          ))}
        </ScrollView>
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
