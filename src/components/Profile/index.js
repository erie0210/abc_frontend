import * as Font from "expo-font";

import { Dimensions, Image, ScrollView, Text, TextInput } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import Btn from "./Btn";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: ${HEIGHT * 0.01}px;
`;

export default Profile = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  if (loaded) {
    return (
      <Wrapper>
        <Image
          source={{
            uri: "https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/100a676229b0c56a?w=400&h=400",
          }}
          style={{
            width: WIDTH * 0.5,
            height: WIDTH * 0.5,
            borderRadius: WIDTH * 0.25,
          }}
        />
        <TextInput
          placeholder="닉네임 수정"
          value={nickName}
          onChangeText={(cur) => setNickName(cur)}
          style={{
            width: WIDTH * 0.7,
            height: WIDTH * 0.5 * 0.4,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            fontSize: 12,
            textAlign: "center",
            fontFamily: "PoorStory",
          }}
        />
        <TextInput
          placeholder="이메일 수정"
          value={email}
          onChangeText={(cur) => setEmail(cur)}
          style={{
            width: WIDTH * 0.7,
            height: WIDTH * 0.5 * 0.4,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            fontSize: 12,
            textAlign: "center",
            fontFamily: "PoorStory",
          }}
        />
        <TextInput
          placeholder="비밀번호 수정"
          value={password}
          onChangeText={(cur) => setPassword(cur)}
          style={{
            width: WIDTH * 0.7,
            height: WIDTH * 0.5 * 0.4,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            fontSize: 12,
            textAlign: "center",
            fontFamily: "PoorStory",
          }}
        />
        <TextInput
          placeholder="비밀번호 확인"
          value={password}
          onChangeText={(cur) => setPassword(cur)}
          style={{
            width: WIDTH * 0.7,
            height: WIDTH * 0.5 * 0.4,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            fontSize: 12,
            textAlign: "center",
            fontFamily: "PoorStory",
          }}
        />
        <Btn />
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
