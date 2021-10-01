import * as Font from "expo-font";

import { Dimensions, ScrollView, Text, TextInput } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import { store } from "../../../Redux/store";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  text-align: center;
`;

export default Description = (cur) => {
  const [value, onChangeText] = useState(cur.contents); //review

  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};
  const handleEndEditing = () => {
    store.dispatch({
      type: "updateContents",
      value: value,
    });
  };

  if (loaded) {
    return (
      <Wrapper>
        <Text>상세설명</Text>
        <TextInput
          style={{
            height: 180,
            width: WIDTH * 0.9,
            borderColor: "gray",
            borderWidth: 0.2,
            marginBottom: 10,
            borderColor: "lightgray",
            fontFamily: "PoorStory",
            textAlign: "center",
          }}
          placeholder="자세한 설명을 입력해주세요"
          onChangeText={(text) => onChangeText(text)}
          value={value}
          onEndEditing={handleEndEditing}
          multiline
        />
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
