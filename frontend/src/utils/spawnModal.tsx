import { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";
import { NavigateFunction } from "react-router-dom";
import Button from "../components/UI/Button/Button";
import { MAIN_ROUTE } from "./constants";

export const spawModal = (
  body: ReactElement | string, delay?: number, navigate?: NavigateFunction, to?: string
) => {
  const modal = document.querySelector('#modal') as HTMLElement
  const btn = document.createElement('button')
  btn.innerHTML = '<u style="color: white;">Пропустить</u>'
  btn.addEventListener('click', hideModal);

  function showModal() {
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

  function hideModal() {
    console.log(1)
    modal.style.opacity = '0'
    setTimeout(() => {
      modal.style.visibility = 'hidden'
      modal.style.zIndex = '-100'
    }, 500)
    modal.innerHTML = ''
    if (navigate) {
      navigate(to ?? MAIN_ROUTE)
    }
    btn.removeEventListener('click', hideModal)
  }

  showModal()
  setTimeout(hideModal, delay ?? 5000)
}