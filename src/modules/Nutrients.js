import * as Font from "expo-font";

import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;
const TotalContainer = styled.View`
  width: ${WIDTH}px;
  align-items: center;
  /* justify-content: space-around; */
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #e1e1e1;
  padding: 10px;
`;
const NutrientContainer = styled.View`
  width: ${WIDTH}px;
  align-items: center;
  /* justify-content: space-around; */
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #e1e1e1;
  padding: 10px;
`;
const SaveBtn = styled.View`
  width: ${WIDTH * 0.22}px;
  height: ${WIDTH * 0.4 * 0.3}px;
  background-color: #318cee;
`;
const SaveText = styled.Text`
  margin: auto;
  color: #ffffff;
  font-family: "PoorStory";
  font-size: 12px;
`;

export default Total = (cur) => {
  const [total, setTotal] = useState("");

  const [loaded] = Font.useFonts({
    Dela: require("../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};
  const handleSave = async () => {};

  if (loaded) {
    return (
      <Wrapper>
        <TotalContainer>
          <Text>총 무게: {cur.nutrition[0].gram}(g)</Text>
          <Text>총 열량: {cur.nutrition[0].calories}(kcal)</Text>
        </TotalContainer>
        <NutrientContainer>
          <Text>[단]: {cur.nutrition[0].protein}(g)</Text>
          <Text>[당]: {cur.nutrition[0].sugar}(g)</Text>
        </NutrientContainer>
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
