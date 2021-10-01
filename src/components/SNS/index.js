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
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
`;
const RegisterInfo = styled.View``;

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
        <RegisterInfo>
          <Image
            source={{
              uri: "https://thumbs.dreamstime.com/b/bread-icons-bakery-products-vector-set-illustration-74203117.jpg",
            }}
            style={{
              width: WIDTH * 0.5,
              height: WIDTH * 0.5,
              borderRadius: WIDTH * 0.25,
              margin: 40,
            }}
          />
        </RegisterInfo>
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
