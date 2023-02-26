import { createAction, createReducer } from "@reduxjs/toolkit";

export interface GameStoreTypes {
  isAuth: boolean;
  workload: number;
  time: number;
  isContramot1: boolean;
  isContramot2: boolean;
  isContramotor1Broken: boolean;
  rate: 2100;
  showPanel: boolean;
  isBooted: boolean;
  isError: boolean;
}

const game = createAction<GameStoreTypes, 'game'>('game')
export const defaultState = {
  isAuth: true,
  workload: 50,
  time: 0,
  isDirty1: false,
  isDirty2: false,
  isContramot1: false,
  isContramot2: false,
  isContramotor1Broken: false,
  rate: 2100,
  isBooted: true,
  isError: false,
  showPanel: !('ontouchstart' in window)
}

const curState = JSON.parse(localStorage.getItem('game_store') ?? 'null') 
  ?? defaultState

localStorage.removeItem('game_store')

export const gameReducer = createReducer(curState, builder => 
  builder.addCase(game, (state, action) => {
    return {...state, ...action.payload}
  })
)
