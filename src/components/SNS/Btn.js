import * as Font from "expo-font";

import { Dimensions, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;
const NaverContainer = styled.View`
  width: ${WIDTH * 0.5}px;
  height: ${WIDTH * 0.5 * 0.3}px;
  background-color: #03c65a;
  border-radius: 10px;
  margin: 10px;
`;
const NaverText = styled.Text`
  margin: auto;
  font-family: "PoorStory";
  font-size: 12px;
  color: #ffffff;
`;
const KakaoContainer = styled.View`
  width: ${WIDTH * 0.5}px;
  height: ${WIDTH * 0.5 * 0.3}px;
  background-color: #ead103;
  border-radius: 10px;
  margin: 10px;
`;
const KakaoText = styled.Text`
  margin: auto;
  font-family: "PoorStory";
  font-size: 12px;
  color: #ffffff;
`;
const GoogleContainer = styled.View`
  width: ${WIDTH * 0.5}px;
  height: ${WIDTH * 0.5 * 0.3}px;
  background-color: #ffffff;
  border: 1px black solid;
  border-radius: 10px;
  margin: 10px;
`;
const GoogleText = styled.Text`
  margin: auto;
  font-family: "PoorStory";
  font-size: 12px;
  color: black;
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
        <NaverContainer>
          <NaverText>네이버 로그인</NaverText>
        </NaverContainer>
        <KakaoContainer>
          <KakaoText>카카오 로그인</KakaoText>
        </KakaoContainer>
        <GoogleContainer>
          <GoogleText>GOOGLE 로그인</GoogleText>
        </GoogleContainer>
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
