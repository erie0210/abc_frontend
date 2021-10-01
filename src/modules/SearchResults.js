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
  border-bottom-width: 0.4px;
  border-bottom-color: lightgray;
`;
const Title = styled.Text`
  font-size: 20px;
  font-family: "DoHyeon";
  margin: 10px;
`;
const NutritionInfoContainer = styled.View`
  margin: 14px;
`;
const NutritionInto = styled.Text``;

export default SearchResults = ({ cur }) => {
  const [loaded] = Font.useFonts({
    Dela: require("../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const Navigation = useNavigation();
  const goToDetail = (cur) => {
    Navigation.navigate("PublicDetailed", { cur });
  };

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
          {/* <Image
            source={{ uri: cur.pictures[0] }}
            style={{
              width: WIDTH * 0.9,
              height: WIDTH * 0.9 * 0.8,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          /> */}
        </Pressable>
        <NutritionInfoContainer>
          <Text>
            {cur.contents.length > 100
              ? cur.contents.slice(0, 100) + ` [ 더보기... ]`
              : cur.contents}
          </Text>
        </NutritionInfoContainer>
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
