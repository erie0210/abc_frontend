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
import { login } from "../../../apis";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  align-items: center;
  /* justify-content: space-around; */
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${WIDTH * 0.03}px;
  margin-bottom: ${WIDTH * 0.03}px;
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

export default Total = (params) => {
  // console.log("params in total container nutrient: ", params.total_nutrition);
  const [total, setTotal] = useState("");

  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};
  const handleSave = async () => {
    const res = await login();
    // console.log("login", res);
    return res;
  };

  if (loaded) {
    return (
      <Wrapper>
        <Text>총 무게: {params.total_gram}(g)</Text>
        <TextInput
          placeholder="총 무게 변경"
          value={total}
          onChangeText={(cur) => setTotal(cur)}
          style={{
            backgroundColor: "white",
            width: WIDTH * 0.4,
            height: WIDTH * 0.4 * 0.3,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            fontSize: 12,
            textAlign: "center",
            fontFamily: "PoorStory",
          }}
        />
        <Pressable onPress={handleSave}>
          <SaveBtn>
            <SaveText>변경</SaveText>
          </SaveBtn>
        </Pressable>
        <Text>총 열량: {params.total_nutrition.calories}(kcal)</Text>
        <Text>[단]: {params.total_nutrition.protein}(g)</Text>
        <Text>[당]: {params.total_nutrition.sugar}(g)</Text>
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
