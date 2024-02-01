import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType } from "../utils/types";

interface ConstructorState {
  bun: IngredientType | null;
  ingredients: IngredientType[];
  bunPrice: number;
  ingredientsPrice: number;
  order: string | null;
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  bunPrice: 0,
  ingredientsPrice: 0,
  order: null,
};

const constructorSlice = createSlice({
  name: "burger-constructor",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IngredientType>) => {
      state.ingredients.push(action.payload);
      state.ingredientsPrice += action.payload.price;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(item => item._id === action.payload);
      if (index > -1) {
        state.ingredientsPrice -= state.ingredients[index].price;
        state.ingredients.splice(index, 1);
      }
    },
    setBun: (state, action: PayloadAction<IngredientType>) => {
      state.bun = action.payload;
      state.bunPrice = action.payload.price * 2;
    },
    composeOrder: state => {
      const ingredientsId = state.ingredients.map(item => item._id);
      const order = {
        ingredients: [...ingredientsId, state.bun?._id, state.bun?._id],
      };
      state.order = JSON.stringify(order);
    },
    clearConstructor: () => initialState,
  },
});

const constructorReducer = constructorSlice.reducer;

export default constructorReducer;
export const { addIngredient, removeIngredient, setBun, composeOrder, clearConstructor } = constructorSlice.actions;