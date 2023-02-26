import { createAction, createReducer } from "@reduxjs/toolkit";

export interface GameStoreTypes {
  isAuth: boolean;
}

const game = createAction<GameStoreTypes, 'game'>('game')

export const gameReducer = createReducer({
  isAuth: false
}, builder => 
  builder.addCase(game, (state, action) => {
    return {...state, ...action.payload}
  })
)
