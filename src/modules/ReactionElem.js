import * as Font from "expo-font";

import { Dimensions, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;

export default Register = (cur) => {
  // console.log("cur in reactelem ", cur);
  const [loaded] = Font.useFonts({
    Dela: require("../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../assets/fonts/DoHyeon-Regular.ttf"),
  });
  const commentLen = cur.comments.length;
  // console.log("cur.comments.length", commentLen);

  const loadAssets = () => {};
  const onFinish = () => {};

  if (loaded) {
    return (
      <Wrapper>
        <Text>❤ {cur.likes} Likes</Text>
        <Text>👻 {commentLen} Comments</Text>
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
