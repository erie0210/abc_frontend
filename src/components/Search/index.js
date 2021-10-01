import * as Font from "expo-font";

import {
  Button,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import SearchResults from "../../modules/SearchResults";
import { search } from "../../../apis";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;
const ResultContainer = styled.View``;

export default Search = () => {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [loaded] = Font.useFonts({
    PoorStory: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  const handleSearch = async (keyword) => {
    const res = await search(keyword, 1, "createdAt");
    // console.log(res.data);
    setList(res.data);
    return;
  };

  const navigation = useNavigation();

  const goToSearchResult = (cur) => {
    navigation.navigate("PublicDetailed", { cur });
  };

  if (loaded) {
    return (
      <ScrollView>
        <Wrapper>
          <TextInput
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChangeText={(cur) => setKeyword(cur)}
            style={{
              borderBottomColor: "lightgray",
              borderBottomWidth: 1,
              marginTop: 5,
              marginBottom: 5,
              textAlign: "center",
              height: HEIGHT * 0.07,
              fontFamily: "PoorStory",
            }}
          />
          <Button title="검색" onPress={() => handleSearch(keyword)} />
          <ResultContainer>
            {list.map((cur) => (
              <Pressable
                key={`${cur._id}-btn`}
                onPress={() => goToSearchResult(cur)}
              >
                <SearchResults key={cur._id} cur={cur} />
              </Pressable>
            ))}
          </ResultContainer>
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
