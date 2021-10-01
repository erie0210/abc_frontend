import * as Font from "expo-font";

import {
  Alert,
  Button,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import Comments from "../../modules/Comments";
import Reaction from "../../modules/ReactionElem";
import RecipeList from "../../modules/RecipeList";
import { postPublicRecipeToMyList } from "../../../apis";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  margin-bottom: 30px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-family: "DoHyeon";
  margin: 10px;
`;
const NutritionInfoContainer = styled.View``;
const NutritionInto = styled.Text``;
const SaveBtn = styled.View`
  width: ${WIDTH * 0.9}px;
  height: ${WIDTH * 0.9 * 0.15}px;
  background-color: #318cee;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const SaveBtnText = styled.Text`
  color: #ffffff;
`;

export default PublicDetailed = ({
  route: {
    params: { cur },
  },
}) => {
  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  const handleMyRecipe = async (recipe) => {
    await postPublicRecipeToMyList(recipe);
    Alert.alert("", "레시피를 담았습니다!~~~", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  if (loaded) {
    return (
      <ScrollView>
        <Wrapper>
          <Title>{cur.title}</Title>
          <Image
            source={{ uri: cur.pictures[0] }}
            style={{
              width: WIDTH,
              height: WIDTH * 0.8,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <Reaction />
          <NutritionInfoContainer>
            <NutritionInto>영양정보: 75(g) 150kcal</NutritionInto>
            <Text>단백질 4(g) 당류 2(g)</Text>
            <Text>별점 ⭐ {cur.star} / 5</Text>
            <RecipeList />
            <Text>{cur.contents}</Text>
          </NutritionInfoContainer>
          <Pressable onPress={() => handleMyRecipe(cur)}>
            <SaveBtn>
              <SaveBtnText>내 레시피에 담기</SaveBtnText>
            </SaveBtn>
          </Pressable>
          <Comments />
        </Wrapper>
      </ScrollView>
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
