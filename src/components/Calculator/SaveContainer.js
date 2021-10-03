import * as Font from "expo-font";

import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import { createRecipe } from "../../../apis";
import { store } from "../../../Redux/store";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${WIDTH * 0.03}px;
  margin-bottom: ${WIDTH * 0.03}px;
`;
const SaveBtn = styled.View`
  width: ${WIDTH * 0.22}px;
  height: ${WIDTH * 0.22 * 0.6}px;
  border: 1.5px black solid;
  border-radius: 5px;
`;
const SaveText = styled.Text`
  margin: auto;
  font-family: "PoorStory";
  font-size: 12px;
`;
const ShareBtn = styled.View`
  width: ${WIDTH * 0.22}px;
  height: ${WIDTH * 0.22 * 0.6}px;
  background-color: #318cee;
  border-radius: 5px;
`;
const UnshareBtn = styled.View`
  width: ${WIDTH * 0.22}px;
  height: ${WIDTH * 0.22 * 0.6}px;
  border-radius: 5px;
  border: #318cee 2px solid;
`;
const ShareText = styled.Text`
  margin: auto;
  color: #ffffff;
  font-family: "PoorStory";
  font-size: 12px;
`;
const UnshareText = styled.Text`
  margin: auto;
  color: #318cee;
  font-family: "PoorStory";
  font-size: 12px;
`;

export default Save = (params) => {
  const [title, setTitle] = useState(params ? params.state.title : "");
  const [share, setShare] = useState(params ? params.state.share : true);

  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const handleSave = async (title) => {
    await store.dispatch({
      type: "save",
      value: {
        recipeName: title,
      },
    });
    const res = await store.getState();
    // console.log("res in handleSave: ", res);
    await createRecipe(res);
    Alert.alert("저장되었습니다.");
    // setTitle("");
  };

  const handleShare = async () => {
    setShare(!share);
    await store.dispatch({
      type: "changeShare",
    });
  };
  const loadAssets = () => {};
  const onFinish = () => {};

  if (loaded) {
    return (
      <Wrapper>
        {/* 레시피 이름 */}
        <TextInput
          placeholder="레시피 이름"
          value={title}
          onChangeText={(cur) => setTitle(cur)}
          style={{
            width: WIDTH * 0.5,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            fontSize: 12,
            textAlign: "center",
            fontFamily: "PoorStory",
          }}
        />

        <Pressable onPress={handleShare}>
          {share ? (
            <ShareBtn>
              <ShareText>공유 ON</ShareText>
            </ShareBtn>
          ) : (
            <UnshareBtn>
              <UnshareText>공유 OFF</UnshareText>
            </UnshareBtn>
          )}
        </Pressable>

        <Pressable onPress={() => handleSave(title)}>
          <SaveBtn>
            <SaveText>저장</SaveText>
          </SaveBtn>
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
