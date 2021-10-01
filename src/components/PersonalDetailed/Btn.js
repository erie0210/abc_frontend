import * as Font from "expo-font";

import { Alert, Dimensions, Pressable, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { updateRecipe, uploadToS3 } from "../../../apis";

import AppLoading from "expo-app-loading";
import { store } from "../../../Redux/store";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;
const BtnContainer = styled.View`
  width: ${WIDTH * 0.6}px;
  height: ${WIDTH * 0.8 * 0.25}px;
  justify-content: center;
  border-radius: 10px;
  border: 1.5px gray solid;
  margin: auto;
  margin-bottom: 5px;
`;
const BtnText = styled.Text`
  text-align: center;
  font-family: "PoorStory";
`;
const DelBtnContainer = styled.View`
  width: ${WIDTH * 0.6}px;
  height: ${WIDTH * 0.8 * 0.25}px;
  justify-content: center;
  border-radius: 10px;
  border: 1.5px tomato solid;
  margin: auto;
  margin-bottom: 5px;
`;
const DelBtnText = styled.Text`
  text-align: center;
  color: tomato;
  font-family: "PoorStory";
`;

export default Btn = (cur) => {
  // console.log("cur in btns", cur);
  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};
  const handleDelete = () => {};
  const goToCalculator = () => {
    console.log(store.getState());
  };
  const handleSave = async () => {
    const res = store.getState();
    const imageURL = await uploadToS3(res.pictures[0]);
    // console.log("imageURL: ", imageURL);
    await store.dispatch({
      type: "updateImage",
      value: imageURL,
    });
    await updateRecipe(cur.id);
    Alert.alert("저장되었습니다.");
  };

  if (loaded) {
    return (
      <Wrapper>
        <Pressable onPress={goToCalculator}>
          <BtnContainer>
            <BtnText>계산기로 이동하기</BtnText>
          </BtnContainer>
        </Pressable>
        <Pressable onPress={() => handleSave()}>
          <BtnContainer>
            <BtnText>저장하기</BtnText>
          </BtnContainer>
        </Pressable>
        <Pressable onPress={() => handleDelete()}>
          <DelBtnContainer>
            <DelBtnText>삭제하기</DelBtnText>
          </DelBtnContainer>
        </Pressable>
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
