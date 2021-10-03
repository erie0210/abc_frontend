import * as Font from "expo-font";

import {
  Alert,
  Button,
  Dimensions,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import { ingredientNutrients } from "../../../nutrientDB";
import { store } from "../../../Redux/store";
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
const BtnContainer = styled.View`
  width: ${WIDTH * 0.4}px;
  height: ${WIDTH * 0.5 * 0.3}px;
  border-radius: 10px;
  border: 1.5px black solid;
`;
const BtnText = styled.Text`
  margin: auto;
  font-family: "PoorStory";
  font-size: 12px;
`;
const ModalWrapper = styled.View`
  background-color: #fff;
  margin-top: ${HEIGHT * 0.15}px;
  width: ${WIDTH}px;
  height: ${HEIGHT * 0.3}px;
  justify-content: center;
  align-items: center;
`;

export default Btn = () => {
  const [modal, setModal] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputGram, setInputGram] = useState("");

  const [loaded] = Font.useFonts({
    Dela: require("../../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  const handleReset = async () => {
    // await store.dispatch({ type: "reset" });
    console.log("redux state: ", await store.getState());
  };

  const handleAdd = async (inputName, inputGram) => {
    let nutrient = {
      name: inputName,
      calories: "0",
      carb: "0",
      protein: "0",
      fat: "0",
      sugar: "0",
    };
    ingredientNutrients.map((cur) => {
      if (cur.name === inputName) {
        nutrient = cur;
      }
    });
    const date = new Date();
    await store.dispatch({
      type: "addIngredient",
      value: {
        id: date.toString(),
        inputName: inputName,
        inputGram: inputGram,
        nutrient,
      },
    });
    Alert.alert("재료가 추가되었습니다.");
    setInputName("");
    setInputGram("");
    setModal(false);
  };

  // const handleAdd = async (inputName, inputGram) => {
  //   const date = new Date();
  //   await store.dispatch({
  //     type: "addIngredient",
  //     value: {
  //       id: date.toString(),
  //       inputName: inputName,
  //       inputGram: inputGram,
  //     },
  //   });
  //   Alert.alert("재료가 추가되었습니다.");
  //   setInputName("");
  //   setInputGram("");
  //   setModal(false);
  // };

  if (loaded) {
    return (
      <Wrapper>
        <Pressable onPress={handleReset}>
          <BtnContainer>
            <BtnText>초기화</BtnText>
          </BtnContainer>
        </Pressable>

        <Pressable onPress={() => setModal(true)}>
          <BtnContainer>
            <BtnText>재료추가</BtnText>
          </BtnContainer>
        </Pressable>

        <Modal animationType="slide" visible={modal} transparent={true}>
          <ModalWrapper>
            {/* 재료이름 */}
            <TextInput
              placeholder="재료 이름을 입력하세요"
              value={inputName}
              onChangeText={(cur) => setInputName(cur)}
              style={{
                width: WIDTH * 0.5,
                backgroundColor: "#fff",
                borderBottomColor: "lightgray",
                borderBottomWidth: 1,
                marginTop: 5,
                marginBottom: 5,
                textAlign: "center",
                height: HEIGHT * 0.07,
                fontFamily: "PoorStory",
              }}
            />
            {/* 재료분량 */}
            <TextInput
              placeholder="재료 무게을 입력하세요"
              value={inputGram}
              onChangeText={(cur) => setInputGram(cur)}
              style={{
                width: WIDTH * 0.5,
                backgroundColor: "#fff",
                borderBottomColor: "lightgray",
                borderBottomWidth: 1,
                marginTop: 5,
                marginBottom: 5,
                textAlign: "center",
                height: HEIGHT * 0.07,
                fontFamily: "PoorStory",
              }}
              keyboardType={"numeric"}
            />
            <Button
              title="재료추가"
              onPress={() => handleAdd(inputName, inputGram)}
            ></Button>
            <Button title="닫기" onPress={() => setModal(false)}></Button>
          </ModalWrapper>
        </Modal>
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
