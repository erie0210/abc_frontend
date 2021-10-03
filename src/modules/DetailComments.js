import * as Font from "expo-font";

import {
  Alert,
  Button,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createComment, deleteComment } from "../../apis";

import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { store } from "../../Redux/store";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  margin-top: 10px;
`;
const CommentContainer = styled.View`
  border-bottom-color: lightgray;
  border-bottom-width: 1px;
  padding-bottom: 20px;
`;
const AddComment = styled.View``;
const TextContainer = styled.View`
  width: ${WIDTH * 0.9}px;
`;
const CommentText = styled.Text`
  font-family: "PoorStory";
  font-size: 15px;
`;
const Comment = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 15px;
  width: ${WIDTH}px;
`;

export default DetailComments = (cur) => {
  const [contents, setContents] = useState("");

  // console.log("cur in comments: ", cur);
  const [loaded] = Font.useFonts({
    Dela: require("../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../assets/fonts/DoHyeon-Regular.ttf"),
  });

  const loadAssets = () => {};
  const onFinish = () => {};

  const handleDeleteComment = async (id) => {
    await deleteComment(id);
    Alert.alert("댓글이 삭제되었습니다.");
    navigation.goBack();
  };

  const navigation = useNavigation();
  const submit = async (targetId, author, contents) => {
    await createComment(targetId, "615922e075d9da472c64491a", contents);
    Alert.alert("댓글이 작성되었습니다.");
    navigation.goBack();
  };

  if (loaded) {
    return (
      <Wrapper>
        <CommentContainer>
          {cur.comments.map((cur) => (
            <Comment key={`${cur._id}+Comment`}>
              <TextContainer key={`${cur._id}+TextContainer`}>
                <CommentText
                  key={cur._id}
                >{`${cur.name}  :  ${cur.contents}`}</CommentText>
              </TextContainer>
              <Pressable onPress={() => handleDeleteComment(cur._id)}>
                <Ionicons
                  key={`${cur._id}+icon`}
                  name="trash-bin-outline"
                  size={20}
                  color="black"
                />
              </Pressable>
            </Comment>
          ))}
        </CommentContainer>
        <AddComment>
          <TextInput
            placeholder="댓글을 입력하세요"
            value={contents}
            onChangeText={(cur) => setContents(cur)}
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
          <Button title="확인" onPress={() => submit(cur._id, "", contents)} />
        </AddComment>
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
