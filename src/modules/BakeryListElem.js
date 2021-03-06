import * as Font from "expo-font";

import { Dimensions, Image, Pressable, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import Comments from "./Comments";
import Reaction from "./ReactionElem";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  margin: 10px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-family: "DoHyeon";
  margin: 10px;
`;
const NutritionInfoContainer = styled.View``;
const NutritionInto = styled.Text``;

export default Register = ({ cur }) => {
  const [loaded] = Font.useFonts({
    Dela: require("../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const Navigation = useNavigation();
  const goToDetail = (cur) => {
    Navigation.navigate("BakeryDetailed", { cur });
  };

  // console.log(cur);
  const loadAssets = () => {};
  const onFinish = () => {};

  if (loaded) {
    return (
      <Wrapper>
        <Title>{cur.title}</Title>
        <Pressable
          onPress={() => goToDetail(cur)}
          android_ripple={{ color: "#2D9CF0" }}
        >
          <Image
            source={{ uri: cur.picture }}
            style={{
              width: WIDTH * 0.9,
              height: WIDTH * 0.9 * 0.8,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </Pressable>
        <Reaction {...cur} />
        <NutritionInfoContainer>
          <Text>
            {cur.body.length > 40
              ? cur.body.slice(0, 40) + ` [ 더보기... ]`
              : cur.body}
          </Text>
        </NutritionInfoContainer>
        <Comments {...cur} />
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
