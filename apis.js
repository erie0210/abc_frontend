import axios from "axios";
import { store } from "./Redux/store";

const ngrok_URL = "https://9d14-1-225-70-39.ngrok.io";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJzdWIiOiI2MTUyNjljNmFiNmM5OTQwNzBiYzE1MzgiLCJpYXQiOjE2MzMxNjIwNzYsImV4cCI6MTY0MDM2MjA3Nn0.f3xG9D0oMDJRn3HAgvmMmOF25LhZ7UBttpuh2fg6a10";

//* 공개상태 데이터 가져오기
export const getPublicRecipeData = async (page) => {
  // console.log("get public recipe data");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const result = await axios.get(
      `${ngrok_URL}/recipes/public/${page}/createdAt`,
      {
        headers: headers,
      }
    );
    // console.log(JSON.parse(result.request._response));
    return result.data;
  } catch (e) {
    console.warn(e);
  }
};

// * 특정 유저의 데이터 캐싱
export const cachePrivateReicpe = async () => {
  // console.log("get public recipe data");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const userId = "615269c6ab6c994070bc1538";
  try {
    const result = await axios.get(`${ngrok_URL}/recipes/private/${userId}`, {
      headers: headers,
    });
    return result.data.data;
  } catch (e) {
    console.warn(e);
  }
};

// * 특정 유저의 카테고리 데이터 가져오기
export const getPrivateRecipeData = async (category, page) => {
  // console.log("get public recipe data", category, page);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const userId = "615269c6ab6c994070bc1538";
  try {
    const result = await axios.get(
      `${ngrok_URL}/recipes/private/${category}/${userId}/${page}`,
      {
        headers: headers,
      }
    );
    return result.data;
  } catch (e) {
    console.warn(e);
  }
};

//* public - detailed 에서 내 레시피에 답기
export const postPublicRecipeToMyList = async (recipe) => {
  const { title, contents, ingredients, nutrition, author } = recipe;
  console.log("recipe", recipe);
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const newRecipe = {
      share: true,
      view: 0,
      comments: [],
      likes: 0,
      title: title + " 복사본",
      contents: "contents",
      pictures: ["https://i.stack.imgur.com/y9DpT.jpg"],
      star: 1,
      ingredients: [],
      nutrition: [{ gram: "90", calories: "240", protein: "12", sugar: "16" }],
      author: "615269c6ab6c994070bc1538",
    };
    const result = await axios.post(`${ngrok_URL}/recipes/`, newRecipe, {
      headers: headers,
    });
    return;
  } catch (e) {
    console.warn(e);
  }
};

//* search
export const search = async (keyword, page, sort) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const body = {
    keyword: keyword,
    page: page,
    sort: sort,
  };
  try {
    const result = await axios.post(`${ngrok_URL}/recipes/search`, body, {
      headers: headers,
    });
    // console.log(result.data);
    return result.data;
  } catch (e) {
    console.warn(e);
  }
};

// * Recipe 생성
export const createRecipe = async (state) => {
  // console.log("createRecipe");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const { title, total_nutrition, TRAY, share } = state;

  const newRecipe = {
    share: share,
    view: 1,
    comments: [],
    likes: 1,
    title: title,
    contents: "contents",
    pictures: [
      "https://truffle-assets.imgix.net/4668bbc0-funfetti-freakshake-cupcakes-lc.jpg",
    ],
    star: 3,
    ingredients: TRAY,
    nutrition: total_nutrition,
    author: "615269c6ab6c994070bc1538",
  };

  try {
    const result = await axios.post(`${ngrok_URL}/recipes`, newRecipe, {
      headers: headers,
    });
    // console.log(JSON.parse(result.request._response));
    return JSON.parse(result.request._response);
  } catch (e) {
    console.warn(e);
  }
};

// * Recipe 업데이트
export const updateRecipe = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  // console.log("id", id);
  try {
    const { contents, pictures, share, star } = store.getState();

    const newRecipe = {
      share: share,
      contents: contents,
      pictures: pictures,
      star: star,
    };
    // console.log("newRecipes", newRecipe);

    const res = await axios.patch(
      `${ngrok_URL}/recipes/update/${id}`,
      newRecipe,
      {
        headers: headers,
      }
    );
    // console.log(res.request);
    return res;
  } catch (error) {
    console.warn(error);
  }
};

// * 댓글 생성
export const createComment = async (targetId, author, contents) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const newComment = {
    author: author,
    contents: contents,
  };
  try {
    const result = await axios.post(
      `${ngrok_URL}/comments/${targetId}`,
      newComment,
      {
        headers: headers,
      }
    );
    return result;
  } catch (error) {
    console.warn(error);
  }
};

// * 댓글 삭제
export const deleteComment = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    return await axios.post(`${ngrok_URL}/comments/delete/${id}`, {
      headers: headers,
    });
  } catch (error) {
    console.warn(error);
  }
};

// *  로그인
export const login = async (email, passwd) => {
  const body = {
    email: email,
    passwd: passwd,
  };
  let result;
  await axios
    .post(`${ngrok_URL}/users/login`, body)
    .then((res) => {
      result = { status: true, data: res.data };
      // console.log("login axios post: ", res.status);
      return;
    })
    .catch((error) => {
      result = { status: false, data: error.response.data };
      // console.log("error ", error.response.data);
      return;
    });
  return result;
};

// * 이미지를 s3에 올리고 URL 생성
export const uploadToS3 = async (base64) => {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "UfYX9V2NkdTJMNqtaDa216LhsLlORLl9GDAmml27",
  };
  const data = {
    IMAGE: base64,
  };
  try {
    const result = await axios.post(
      "https://1tr4fme6k6.execute-api.ap-northeast-2.amazonaws.com/abc-stage/abc-project",
      data,
      { headers }
    );
    // console.log("upload To S3 result: ", result.data);
    return result.data;
  } catch (error) {
    console.warn(error);
  }
};
