import * as Font from "expo-font";

import { Dimensions, ScrollView, Text } from "react-native";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Wrapper = styled.View`
  margin-top: 10px;
`;
const CommentContainer = styled.View`
  width: ${WIDTH * 0.9}px;
  border-bottom-color: lightgray;
  border-bottom-width: 1px;
  padding-bottom: 20px;
`;
const AddComment = styled.Text`
  color: lightgray;
`;

export default Comments = (cur) => {
  // console.log("cur in comments: ", cur);
  const [loaded] = Font.useFonts({
    Dela: require("../../assets/fonts/DelaGothicOne-Regular.ttf"),
    PoorStory: require("../../assets/fonts/PoorStory-Regular.ttf"),
    DoHyeon: require("../../assets/fonts/DoHyeon-Regular.ttf"),
  });
  const commentLen = cur.comments.length;
  // console.log("cur.comments.length", commentLen);

  const loadAssets = () => {};
  const onFinish = () => {};

  if (loaded) {
    return (
      <Wrapper>
        <CommentContainer>
          {commentLen > 0 ? (
            <Text
              key={cur.comments[0]._id}
            >{`${cur.comments[0].name}  :  ${cur.comments[0].contents} ... [더보기]`}</Text>
          ) : (
            <></>
          )}
        </CommentContainer>
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
