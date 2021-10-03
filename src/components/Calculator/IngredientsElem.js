import * as Font from "expo-font";

import { Dimensions, Pressable, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { store } from "../../../Redux/store";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  align-items: center;
  /* justify-content: space-around; */
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 10px;
  padding-bottom: 10px;
  border-bottom-width: 0.5px;
  border-bottom-color: lightgray;
`;
const Container = styled.View``;
const Nutrients = styled.Text`
  font-size: 12px;
  color: gray;
`;
const Ingredient = styled.Text``;

export default IngredientElem = (cur) => {
  console.log("cur in ingredient elem", cur);
  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  const handleDelete = async (id) => {
    await store.dispatch({
      type: "deleteIngredient",
      value: {
        id,
      },
    });
  };

  if (loaded) {
    return (
      <Wrapper>
        <Container>
          <Ingredient>
            {cur.inputName} {cur.inputGram}(g) -(%)
          </Ingredient>
          <Nutrients>
            {cur.nutrient.calories}(kcal) [탄]{cur.nutrient.carb}(g) [단]
            {cur.nutrient.protein}(g) [지]{cur.nutrient.fat}(g) [당]
            {cur.nutrient.sugar}(g)
          </Nutrients>
        </Container>
        <Pressable onPress={() => handleDelete(cur.id)}>
          <Ionicons name="trash-bin-outline" size={20} color="black" />
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
