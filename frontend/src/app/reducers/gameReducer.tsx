import { createAction, createReducer } from "@reduxjs/toolkit";

export interface GameStoreTypes {
  isAuth: boolean;
  workload: number;
  time: number
}

const game = createAction<GameStoreTypes, 'game'>('game')

export const gameReducer = createReducer({
  isAuth: true,
  workload: 50,
  time: 0
}, builder => 
  builder.addCase(game, (state, action) => {
    return {...state, ...action.payload}
  })
)
