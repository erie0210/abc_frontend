import { createStore } from "redux";

const init_state = {
  title: "",
  share: true,
  total_nutrition: [{ gram: 0, calories: 0, protein: 0, sugar: 0 }],
  TRAY: [],
  contents: "",
  pictures: [],
  star: 3,
};

const user_info = {
  userName: "joielee",
  savedRecipe: [],
};

// [질문] React에서 async를 쓸 수 있을까?
const Reducer = (state = init_state, action) => {
  switch (action.type) {
    // * share 상태 바꾸기
    case "changeShare":
      state.share = !state.share;
      return {
        ...state,
      };

    // * title 저장하기
    case "save":
      state.title = action.value.recipeName;
      // const res = createRecipe(state);
      // console.log("res save", res);
      return {
        ...state,
      };

    // * 총 재료양 바꾸기
    case "changeTotalFlour":
      return {
        ...state,
      };

    // * 재료 추가하기
    case "addIngredient":
      state.TRAY.push(action.value);
      // console.log("add", state);
      return {
        ...state,
      };

    // * 재료 삭제하기
    case "deleteIngredient":
      const result = state.TRAY.filter((cur) => cur.id !== action.value.id);
      state.TRAY = result;
      return {
        ...state,
      };

    // * 초기화
    case "reset":
      state = {
        recipe_name: "",
        share: true,
        total_nutrition: {
          calories: 0,
          protein: 0,
          sugar: 0,
        },
        TRAY: [],
      };
      return {
        ...state,
      };

    case "goToCalculator":
      const data = action.value;
      // console.log("data", data);
      const data2 = {
        title: data.title,
        share: data.share,
        total_nutrition: data.nutrition,
        TRAY: data.ingredients,
        contents: data.comments,
        pictures: data.pictures,
        star: data.star,
      };
      state = data2;
      // console.log("state", state);
      return {
        ...state,
      };

    case "saveRecipeToRedux":
      const recipe = {
        title: action.value.title,
        share: action.value.share,
        total_nutrition: action.value.nutrition,
        TRAY: action.value.ingredients,
      };
      state = recipe;
      // console.log("save Recipe To Redux action value: ", action.value);
      return {
        ...state,
      };

    // * Personal Detailed 업데이트하기
    case "updateContents":
      state.contents = action.value;
      console.log("update contents: ", state.contents);
      return {
        ...state,
      };

    case "updateStar":
      state.star = action.value;
      console.log("update rate: ", state.star);
      return {
        ...state,
      };

    case "updateImage":
      state.pictures = [];
      state.pictures.unshift(action.value);
      // console.log("update image: ", state.pictures);
      return {
        ...state,
      };

    case "savePersonalDetailed":
      console.log("save personal detailed");
      return {
        ...state,
      };
  }
  return state;
};

export const store = createStore(Reducer);
