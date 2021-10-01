import * as Font from "expo-font";

import { Dimensions, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import Ingredient from "../../modules/Ingredient";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  margin: 12px;
  margin-top: 22px;
  margin-bottom: 22px;
`;
const Title = styled.Text`
  font-size: 16px;
  text-align: center;
`;

export default RecipeList = (cur) => {
  // console.log("personal recipe recipelist cur: ", cur);
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
        <Title>[ 레시피 ]</Title>
        {cur.ingredients.map((cur) => (
          <Ingredient key={cur.id} {...cur} />
        ))}
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
