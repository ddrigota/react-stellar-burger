import { createReducer } from "@reduxjs/toolkit";
import { OrderListType } from "../../utils/types";
import { wsMessageOrder } from "./actions";

interface OrderState {
  data: OrderListType | null;
}

export const initialState: OrderState = {
  data: null,
};

export const myOrders = createReducer(initialState, builder => {
  builder.addCase(wsMessageOrder, (state, action) => {
    state.data = action.payload;
    // console.log("wsMessageOrder", action.payload);
  });
});
