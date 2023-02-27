import { AnyAction, Dispatch } from "@reduxjs/toolkit"
import { defaultState } from "../app/reducers/gameReducer"
import { myTimeouts } from "./myTomiouts"

export function finishGame(dispatch: Dispatch<AnyAction>){
  myTimeouts.clearAll()
  dispatch({type: 'game', payload: defaultState})
}