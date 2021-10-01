import * as Font from "expo-font";

import { Dimensions, Image, Pressable, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;

export default ListElem = (cur) => {
  // console.log("cur in ListElem : ", cur);
  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};
  const copy = () => {
    // console.log("copy");
  };

  const Navigation = useNavigation();
  const goToDetail = (cur) => {
    Navigation.navigate("PersonalDetailed", { cur });
  };

  if (loaded) {
    return (
      <Pressable onLongPress={() => copy()} onPress={() => goToDetail(cur)}>
        <Wrapper>
          <Image
            source={{
              uri: `${cur.pictures[0]}`,
            }}
            style={{
              width: WIDTH * 0.293,
              height: WIDTH * 0.293,
              margin: 1,
            }}
          />
        </Wrapper>
      </Pressable>
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
