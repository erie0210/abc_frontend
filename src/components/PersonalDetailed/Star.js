import * as Font from "expo-font";

import { Dimensions, Pressable, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import { store } from "../../../Redux/store";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;
const ButtonContainer = styled.View`
  margin: 30px;
`;
const RateEmo = styled.Text`
  font-size: 16px;
  font-family: "PoorStory";
  margin: auto;
  color: gray;
`;
const Star = styled.Text`'
  margin: 10px;
  font-size: 28px;
  font-family: 'PoorStory';
`;
const StarContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
`;

export default StarRating = (cur) => {
  const [rate, setRate] = useState(cur.star);

  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  const handleSetRate = async (number) => {
    setRate(number);
    await store.dispatch({
      type: "updateStar",
      value: number,
    });
  };

  if (loaded) {
    return (
      <Wrapper>
        <RateEmo>{`[ 점수: ${rate}/5 ]`}</RateEmo>
        <StarContainer>
          <Pressable onPress={() => handleSetRate(1)}>
            <Star>❤ </Star>
          </Pressable>
          <Pressable onPress={() => handleSetRate(2)}>
            {rate >= "2" ? <Star>❤ </Star> : <Star>🖤 </Star>}
          </Pressable>
          <Pressable onPress={() => handleSetRate(3)}>
            {rate >= "3" ? <Star>❤ </Star> : <Star>🖤 </Star>}
          </Pressable>
          <Pressable onPress={() => handleSetRate(4)}>
            {rate >= "4" ? <Star>❤ </Star> : <Star>🖤 </Star>}
          </Pressable>
          <Pressable onPress={() => handleSetRate(5)}>
            {rate >= "5" ? <Star>❤ </Star> : <Star>🖤 </Star>}
          </Pressable>
        </StarContainer>
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
