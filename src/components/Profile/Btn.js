import * as Font from "expo-font";

import { Dimensions, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${HEIGHT * 0.01}px;
`;
const BtnContainer = styled.View`
  width: ${WIDTH * 0.3}px;
  height: ${WIDTH * 0.5 * 0.3}px;
  border-radius: 10px;
  border: 1.5px black solid;
  margin: 4px;
`;
const BtnText = styled.Text`
  margin: auto;
  font-family: "PoorStory";
  font-size: 12px;
`;

export default Btn = () => {
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
        <BtnContainer>
          <BtnText>수정하기</BtnText>
        </BtnContainer>

        <BtnContainer>
          <BtnText>탈퇴하기</BtnText>
        </BtnContainer>

        <BtnContainer>
          <BtnText>로그아웃</BtnText>
        </BtnContainer>
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
