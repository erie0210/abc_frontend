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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../../apis";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

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
const BtnContainer = styled.View`
  width: ${WIDTH}px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  margin: 50px;
`;
const Btn = styled.View`
  border: 1px lightgray solid;
  border-radius: 10px;
  padding: 26px;
`;
const BtnText = styled.Text`
  font-family: "PoorStory";
`;

export default Profile = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  const navigation = useNavigation();
  const handleRegister = async () => {
    navigation.navigate("Register", {});
    console.log(await AsyncStorage.getItem("UserInfo"));
  };
  const handleLogin = async () => {
    if (email === "") {
      Alert.alert("이메일을 입력해주세요");
      return;
    }
    if (passwd === "") {
      Alert.alert("비밀번호를 입력해주세요");
      return;
    }

    const res = await login(email, passwd);
    if (res.status === true) {
      // * set Local Storage: token, refresh token, hashed token, user
      await AsyncStorage.setItem("UserInfo", JSON.stringify(res));
      await AsyncStorage.setItem("token", JSON.stringify(res.data.data.token));
      await AsyncStorage.setItem(
        "refreshToken",
        JSON.stringify(res.data.data.refreshToken)
      );
      await AsyncStorage.setItem(
        "hashedToken",
        JSON.stringify(res.data.data.hashedToken)
      );
      await AsyncStorage.setItem("user", JSON.stringify(res.data.data.user));

      console.log("로그인 통신 성공");
      navigation.replace("Tab");
    } else {
      console.log(res.data.message);
      Alert.alert(res.data.message);
      return;
    }
  };

  if (loaded) {
    return (
      <ScrollView>
        <Wrapper>
          <RegisterInfo>
            {/* ABC 프로젝트 이미지 */}
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

          {/* 소셜 로그인 */}
          {/* <Btn /> */}

          {/* Email 로그인 */}
          <TextInput
            placeholder="이메일 입력"
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
            value={passwd}
            onChangeText={(cur) => setPasswd(cur)}
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

          {/* 로그인 회원가입 버튼 */}
          <BtnContainer>
            <Pressable onPress={handleRegister}>
              <Btn>
                <BtnText>회원가입</BtnText>
              </Btn>
            </Pressable>
            <Pressable onPress={handleLogin}>
              <Btn>
                <BtnText>로그인</BtnText>
              </Btn>
            </Pressable>
          </BtnContainer>
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
