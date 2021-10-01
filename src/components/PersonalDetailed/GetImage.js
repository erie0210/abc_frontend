import * as Font from "expo-font";
import * as ImagePicker from "expo-image-picker";

import { Dimensions, Image, Pressable, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import { store } from "../../../Redux/store";
import styled from "styled-components/native";
import { uploadToS3 } from "../../../apis";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  margin: auto;
`;

const BtnContainer = styled.View`
  width: ${WIDTH}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
`;
const Btn = styled.View`
  /* background-color: #2288DD; */
  width: ${WIDTH * 0.25}px;
  height: ${WIDTH * 0.4 * 0.4}px;
  justify-content: center;
  border-radius: 10px;
  border: 1.5px black solid;
`;
const BtnText = styled.Text`
  text-align: center;
  font-family: "PoorStory";
`;

// [질문] handleImageDistpatch로 모듈화하려고 하면 하나씩 밀려서 dispatch되는데 이건 왜때문이고 어떻게 해결할 수 있을까?
export default GetImage = (cur) => {
  const [image, setImage] = useState(cur.pictures[0]);
  const [base64, setBase64] = useState("");

  // console.log("get image in personal detail cur: ", cur);
  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  const handleImageDispatch = () => {
    store.dispatch({
      type: "updateImage",
      value: image,
    });
  };

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    // console.log("status: ", status);

    if (status === "granted") {
      try {
        let photo = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });
        store.dispatch({
          type: "updateImage",
          value: photo.base64,
        });
        setImage(photo.uri);
        setBase64(photo.base64);
      } catch (error) {
        console.warn("error in handle camera", error);
      }
    } else {
      console.warn("not granted");
    }
  };
  const handleAlbum = async () => {
    // Picker -> get and render image -> save it in localstorage
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });
        store.dispatch({
          type: "updateImage",
          value: result.base64,
        });
        setImage(result.uri);
        setBase64(result.base64);
      } catch (error) {
        console.warn("error in handle album", error);
      }
    } else {
      console.warn("not granted");
    }
  };
  const resetImage = async () => {
    store.dispatch({
      type: "updateImage",
      value: "https://i.stack.imgur.com/y9DpT.jpg",
    });
    setImage("https://i.stack.imgur.com/y9DpT.jpg");
  };

  if (loaded) {
    return (
      <Wrapper>
        <Image
          source={{
            uri: image,
          }}
          style={{ width: WIDTH, height: WIDTH * 0.8 }}
        />
        <BtnContainer>
          <Pressable onPress={handleCamera}>
            <Btn>
              <BtnText>카메라</BtnText>
            </Btn>
          </Pressable>
          <Pressable onPress={handleAlbum}>
            <Btn>
              <BtnText>앨범</BtnText>
            </Btn>
          </Pressable>
          <Pressable onPress={resetImage}>
            <Btn>
              <BtnText>초기화</BtnText>
            </Btn>
          </Pressable>
        </BtnContainer>
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
