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
import Comments from "../../modules/DetailComments";
import Reaction from "../../modules/ReactionElem";
import RecipeList from "../../modules/RecipeList";
import { postPublicRecipeToMyList } from "../../../apis";
import { store } from "../../../Redux/store";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

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
  // console.log("Public Detailed cur: ", cur);
  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });
  const navigation = useNavigation();

  const loadAssets = () => {};
  const onFinish = () => {};

  const handleMyRecipe = async (cur) => {
    // console.log("cur in handle my recipe", cur);
    await store.dispatch({
      type: "goToCalculator",
      value: cur,
    });
    Alert.alert("", "레시피를 담았습니다!!!", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
    navigation.navigate("Calculator", {});
  };

  if (loaded) {
    return (
      <ScrollView>
        <Wrapper>
          {/* 레시피 제목과 이미지 */}
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
          {/* 좋아요, 댓글 수 */}
          <Reaction {...cur} />
          {/* 영양정보 */}
          <NutritionInfoContainer>
            <NutritionInto>영양정보: 75(g) 150kcal</NutritionInto>
            <Text>단백질 4(g) 당류 2(g)</Text>
            <Text>별점 ⭐ {cur.star} / 5</Text>
            {/* 레시피 재료 리스트 */}
            <RecipeList {...cur} />
            <Text>{cur.contents}</Text>
          </NutritionInfoContainer>
          {/* 내 레시피 담기 버튼 */}
          <Pressable onPress={() => handleMyRecipe(cur)}>
            <SaveBtn>
              <SaveBtnText>내 레시피에 담기</SaveBtnText>
            </SaveBtn>
          </Pressable>
          {/* 댓글 */}
          <Comments {...cur} />
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
