import { createAction, createReducer } from "@reduxjs/toolkit";

export interface GameStoreTypes {
  isAuth: boolean;
  workload: number;
  time: number;
  isContramot1: boolean;
  isContramot2: boolean;
  isContramotor1Broken: boolean;
}

const game = createAction<GameStoreTypes, 'game'>('game')

export const gameReducer = createReducer({
  isAuth: true,
  workload: 50,
  time: 0,
  isContramot1: false,
  isContramot2: false,
  isContramotor1Broken: false
}, builder => 
  builder.addCase(game, (state, action) => {
    return {...state, ...action.payload}
  })
)
