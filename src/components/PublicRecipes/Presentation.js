import * as Font from "expo-font";

import {
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
} from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import Recipe from "../../modules/ListElement";
import { getPublicRecipeData } from "../../../apis";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;

const LoadingContainer = styled.View`
  padding: 20px;
  margin: auto;
`;
const LoadingBtn = styled.Text``;

// const wait = (timeout) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// };

export default RecipesPresentation = ({ recipes }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(recipes.data);
  // console.log("recipes in public recipes presentation", recipes.data[0]);
  // * Pulldown to refresh
  // const [refreshing, setRefreshing] = useState(false);
  // const [recipe, setRecipe] = useState({ recipes });
  // console.log("newRecipe", newRecipe);

  // const onRefresh = React.useCallback(async () => {
  //   setRefreshing(true);
  //   const result = await getPublicRecipeData();
  //   setRecipe(result);
  // console.log("result in presentation", result);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  const [loaded] = Font.useFonts({
    PoorStory: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};
  const handleLoading = async () => {
    console.log("page in handle pulbic recipe loading: ", page + 1);
    const res = await getPublicRecipeData(page + 1);
    setData(res);
    // console.log(" 추가로딩 ", res);
    setPage(page + 1);
  };

  if (loaded) {
    return (
      <ScrollView
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      >
        <Wrapper>
          {data.map((cur) => (
            <Recipe key={cur._id} cur={cur} />
          ))}
        </Wrapper>

        {/* 추가로딩 */}
        <Pressable onPress={handleLoading}>
          <LoadingContainer>
            <LoadingBtn>더보기</LoadingBtn>
          </LoadingContainer>
        </Pressable>
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
