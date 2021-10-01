import * as Font from "expo-font";

import { Dimensions, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import Btn from "./Btn";
import Description from "./Description";
import GetImage from "./GetImage";
import Nutrients from "../../modules/Nutrients";
import RecipeList from "./RecipeList";
import StarRating from "./Star";
import { store } from "../../../Redux/store";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;
const Title = styled.View`
  width: ${WIDTH * 0.9}px;
  padding: 10px;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  border-bottom-color: lightgray;
  border-bottom-width: 2px;
  border-top-color: lightgray;
  border-top-width: 2px;
`;
const TitleText = styled.Text`
  font-size: 28px;
  font-family: "PoorStory";
  margin: auto;
`;

export default PersonalDetailed = ({
  route: {
    params: { cur },
  },
}) => {
  // console.log("cur in personal detailed: ", cur);
  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {
    store.dispatch({
      type: "reset",
    });
  };
  const onFinish = () => {};

  if (loaded) {
    return (
      <ScrollView>
        <Wrapper>
          <Title>
            <TitleText>{cur.title}</TitleText>
          </Title>
          <GetImage {...cur} />
          <Nutrients {...cur} />
          <RecipeList {...cur} />
          <StarRating {...cur} />
          <Description {...cur} />
          <Btn {...cur} />
        </Wrapper>
      </ScrollView>
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
