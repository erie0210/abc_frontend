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
import React, { useEffect, useState } from "react";
import { cancleMembershipApi, getUser, updateUser } from "../../../apis";

import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Btn from "./Btn";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: ${HEIGHT * 0.01}px;
`;
const BtnWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${HEIGHT * 0.01}px;
`;
const BtnContainer = styled.View`
  width: ${WIDTH * 0.3}px;
  height: ${WIDTH * 0.5 * 0.3}px;
  border-radius: 10px;
  border: 1.5px black solid;
  margin: 4px;
`;
const BtnText = styled.Text`
  margin: auto;
  font-family: "PoorStory";
  font-size: 12px;
`;

export default Profile = () => {
  const [userInfo, setUserInfo] = useState();
  const [nickName, setNickName] = useState("");
  const [initNickName, setInitNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = async () => {
    const loadUser = await getUser();
    setUserInfo(loadUser);
    setNickName(loadUser.nickname);
    setInitNickName(loadUser.nickname);
    // console.log(loadUser.nickname);
    // const userData = await AsyncStorage.getItem("UserInfo");
    // const user = JSON.parse(userData).data.data.user;
  };
  const onFinish = () => {};

  const handleEdit = async () => {
    if (nickName === initNickName && password === "") {
      Alert.alert("수정할 내용을 입력해주세요.");
      return;
    }
    const res = await updateUser(userInfo._id, nickName, password);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.data));
    Alert.alert("수정되었습니다.");
  };

  const cancleMembership = async () => {
    await cancleMembershipApi(userInfo._id);

    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);

    Alert.alert("성공적으로 회원탈퇴 되었습니다.");
    navigation.replace("SNS");
    // const res = await AsyncStorage.getItem("user");
    // console.log(res);
  };

  const navigation = useNavigation();

  const handleLogout = async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);

    Alert.alert("로그아웃 되었습니다.");
    navigation.replace("SNS");
  };

  if (loaded) {
    return (
      <ScrollView>
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
              fontSize: 20,
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
          />

          {/* 유저 정보 수정 */}
          <BtnWrapper>
            <Pressable onPress={handleEdit}>
              <BtnContainer>
                <BtnText>수정하기</BtnText>
              </BtnContainer>
            </Pressable>

            <Pressable onPress={cancleMembership}>
              <BtnContainer>
                <BtnText>탈퇴하기</BtnText>
              </BtnContainer>
            </Pressable>

            <Pressable onPress={handleLogout}>
              <BtnContainer>
                <BtnText>로그아웃</BtnText>
              </BtnContainer>
            </Pressable>
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
