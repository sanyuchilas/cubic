import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch, ReactElement } from "react";
import ReactDOMServer from "react-dom/server";
import { NavigateFunction } from "react-router-dom";
import { defaultState } from "../app/reducers/gameReducer";
import { MAIN_ROUTE } from "./constants";
import { myIntervals } from "./myIntervals";
import { myTimeouts } from "./myTomiouts";

export const spawnModal = (
  body: ReactElement | string, delay?: number, navigate?: NavigateFunction, dispatch?: Dispatch<AnyAction>
) => {
  const modal = document.querySelector('#modal') as HTMLElement
  const btn = document.createElement('button')
  btn.innerHTML = '<u>Пропустить</u>'
  btn.style.padding = '0.5rem'
  btn.addEventListener('click', hideModal);

  function showModal() {
    myTimeouts.clearAll()
    myIntervals.clearAll()
    modal.style.zIndex = '100'
    modal.style.visibility = 'visible'
    modal.style.opacity = '1'
    modal.innerHTML = ReactDOMServer.renderToString(
      <>
        {body}
      </>
    )
    modal.append(btn)
  }

  const timeOutId = setTimeout(hideModal, delay ? delay * 1000 : 10000)

  function hideModal() {
    btn.removeEventListener('click', hideModal)
    clearTimeout(timeOutId)
    modal.style.opacity = '0'
    setTimeout(() => {
      modal.style.visibility = 'hidden'
      modal.style.zIndex = '-100'
    }, 500)
    modal.innerHTML = ''
    if (dispatch) {
      dispatch({type: 'game', payload: defaultState})
    }
    if (navigate) {
      navigate(MAIN_ROUTE)
    }
  }

  showModal()
}