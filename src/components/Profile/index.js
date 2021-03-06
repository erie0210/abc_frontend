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
      Alert.alert("????????? ????????? ??????????????????.");
      return;
    }
    const res = await updateUser(userInfo._id, nickName, password);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.data));
    Alert.alert("?????????????????????.");
  };

  const cancleMembership = async () => {
    await cancleMembershipApi(userInfo._id);

    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);

    Alert.alert("??????????????? ???????????? ???????????????.");
    navigation.replace("SNS");
    // const res = await AsyncStorage.getItem("user");
    // console.log(res);
  };

  const navigation = useNavigation();

  const handleLogout = async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);

    Alert.alert("???????????? ???????????????.");
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
            placeholder="????????? ??????"
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
            placeholder="???????????? ??????"
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
            placeholder="???????????? ??????"
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

          {/* ?????? ?????? ?????? */}
          <BtnWrapper>
            <Pressable onPress={handleEdit}>
              <BtnContainer>
                <BtnText>????????????</BtnText>
              </BtnContainer>
            </Pressable>

            <Pressable onPress={cancleMembership}>
              <BtnContainer>
                <BtnText>????????????</BtnText>
              </BtnContainer>
            </Pressable>

            <Pressable onPress={handleLogout}>
              <BtnContainer>
                <BtnText>????????????</BtnText>
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
