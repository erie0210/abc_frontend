import * as Font from "expo-font";

import { Dimensions, Image, Pressable, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import ListElem from "./ListElem";
import { getPrivateRecipeData } from "../../../apis";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;
const SortContainer = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${HEIGHT * 0.02}px;
`;
const Sort = styled.View`
  width: 100px;
  align-items: center;
`;
const SortText = styled.Text`
  font-size: 18px;
`;
const Profile = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: ${HEIGHT * 0.01}px;
  margin-right: 14px;
`;
const ProfileText = styled.Text`
  font-size: 14px;
`;
const ListContainer = styled.View`
  width: ${WIDTH * 0.9}px;
  margin: auto;
  flex-direction: row;
  flex-wrap: wrap;
`;
const LoadingContainer = styled.View`
  padding: 20px;
  margin: auto;
`;
const LoadingBtn = styled.Text``;

export default PersonalPresentation = ({ recipes }) => {
  const [category, setCategory] = useState("star");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(recipes);
  // const [loadRecipes, setLoadRecipes] = useState(recipes);

  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  const Navigation = useNavigation();
  const goToProfile = () => {
    Navigation.navigate("Profile", {});
  };
  const handleSortCategory = async () => {
    if (category === "star") {
      const res = await getPrivateRecipeData("title", 1);
      setData(res);
      setCategory("title");
      setPage(1);
    } else if (category === "title") {
      const res = await getPrivateRecipeData("likes", 1);
      setData(res);
      setCategory("likes");
      setPage(1);
    } else if (category === "likes") {
      const res = await getPrivateRecipeData("createdAt", 1);
      setData(res);
      setCategory("createdAt");
      setPage(1);
    } else {
      const res = await getPrivateRecipeData("star", 1);
      setData(res);
      setCategory("star");
      setPage(1);
    }
    // console.log("change sort: ", category);
  };
  const handleLoading = async () => {
    const res = await getPrivateRecipeData(category, page + 1);
    setData(res);
    // console.log(" 추가로딩 ", res);
    setPage(page + 1);
  };

  if (loaded) {
    return (
      <ScrollView>
        <Wrapper>
          {/* Profile */}
          <Pressable onPress={() => goToProfile()}>
            <Profile>
              <Image
                source={{
                  uri: "https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/100a676229b0c56a?w=400&h=400",
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                }}
              />
              <ProfileText>머핀도그</ProfileText>
            </Profile>
          </Pressable>

          {/* Sort */}
          <Pressable onPress={handleSortCategory}>
            <SortContainer>
              <Ionicons
                name="caret-back-circle-outline"
                size={24}
                color="black"
              />
              {category === "star" ? (
                <Sort>
                  <SortText> 별점 </SortText>
                </Sort>
              ) : category === "title" ? (
                <Sort>
                  <SortText> 이름 </SortText>
                </Sort>
              ) : category === "likes" ? (
                <Sort>
                  <SortText> 좋아요 </SortText>
                </Sort>
              ) : (
                <Sort>
                  <SortText> 생성날짜 </SortText>
                </Sort>
              )}
              <Ionicons
                name="caret-forward-circle-outline"
                size={24}
                color="black"
              />
            </SortContainer>
          </Pressable>

          {/* ListContainer */}
          <ListContainer>
            {data.data.map((cur) => (
              <ListElem key={cur._id} {...cur} />
            ))}
          </ListContainer>

          {/* 추가로딩 */}
          <Pressable onPress={handleLoading}>
            <LoadingContainer>
              <LoadingBtn>더보기</LoadingBtn>
            </LoadingContainer>
          </Pressable>
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
