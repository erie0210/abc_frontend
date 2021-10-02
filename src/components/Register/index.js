import * as Font from "expo-font";

import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import Btn from "./Btn";
import { register } from "../../../apis";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View``;
const RegisterInfo = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: ${HEIGHT * 0.01}px;
  width: ${WIDTH}px;
`;
const BtnWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: ${HEIGHT * 0.01}px;
  width: ${WIDTH}px;
  padding: 30px;
`;
const BtnContainer = styled.View`
  width: ${WIDTH * 0.3}px;
  height: ${WIDTH * 0.5 * 0.3}px;
  background-color: #318cee;
  border-radius: 10px;
`;
const BtnText = styled.Text`
  margin: auto;
  font-family: "PoorStory";
  font-size: 12px;
  color: #ffffff;
`;

const NotReadyBtnContainer = styled.View`
  width: ${WIDTH * 0.3}px;
  height: ${WIDTH * 0.5 * 0.3}px;
  border-radius: 10px;
  border: 2px gray solid;
`;
const NotReadyBtnText = styled.Text`
  margin: auto;
  font-family: "PoorStory";
  font-size: 12px;
  color: gray;
`;

export default Profile = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ready, setReady] = useState(false);

  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  const navigation = useNavigation();
  const signUp = async () => {
    console.log("sign up:", nickName, email, password, confirmPassword);
    const res = await register(email, password, nickName);
    // console.log("sign up res in register page: ", res);
    if (res.status === false) {
      Alert.alert("다시 가입해주세요.");
    }
    if (res.status === true) {
      Alert.alert("가입이 완료되었습니다!");
      navigation.replace("SNS");
    }
    return res.data;
  };
  const validatePasswd = () => {
    if (password !== confirmPassword) {
      Alert.alert("비밀번호가 다릅니다.");
    }
    if (nickName && email && password && confirmPassword) {
      setReady(true);
    }
  };

  if (loaded) {
    return (
      <ScrollView>
        <Wrapper>
          <RegisterInfo>
            <Image
              source={{
                uri: "https://www.pngkit.com/png/detail/810-8105516_blue-person-icon-blue-person-icon-png.png",
              }}
              style={{
                width: WIDTH * 0.5,
                height: WIDTH * 0.5,
                borderRadius: WIDTH * 0.25,
              }}
            />
            <TextInput
              placeholder="닉네임"
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
              placeholder="이메일 주소"
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
              placeholder="비밀번호"
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
              value={confirmPassword}
              onChangeText={(cur) => setConfirmPassword(cur)}
              style={{
                width: WIDTH * 0.7,
                height: WIDTH * 0.5 * 0.4,
                borderBottomColor: "lightgray",
                borderBottomWidth: 1,
                fontSize: 12,
                textAlign: "center",
                fontFamily: "PoorStory",
              }}
              onEndEditing={validatePasswd}
            />
          </RegisterInfo>

          {/* 가입하기 */}
          <BtnWrapper>
            {ready ? (
              <Pressable onPress={signUp}>
                <BtnContainer>
                  <BtnText>가입하기</BtnText>
                </BtnContainer>
              </Pressable>
            ) : (
              <NotReadyBtnContainer>
                <NotReadyBtnText>가입하기</NotReadyBtnText>
              </NotReadyBtnContainer>
            )}
          </BtnWrapper>
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
