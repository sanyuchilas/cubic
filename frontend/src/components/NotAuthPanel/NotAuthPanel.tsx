import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import styles from './NotAuthPanel.module.scss'

const login = 'C-32-O'
const password = 'ihelpyou'

const NotAuthPanel = () => {
  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()

  function onBtnClickHandler() {
    if (passwordValue === password && login === loginValue) {
      dispatch({type: 'game', payload: {
        isAuth: true
      }})
      return
    }

    setError(true)
  }
  
  return (
    <>
      <input 
        type="text"
        name="login"
        placeholder='Введите логин...'
        className={styles.input}
        value={loginValue}
        onChange={(evt) => setLoginValue(evt.target.value)}
      />
      <input 
        type="password"
        name="password"
        placeholder='Введите пароль...'
        className={styles.input}
        value={passwordValue}
        onChange={(evt) => setPasswordValue(evt.target.value)}
      />
      <button
        onClick={onBtnClickHandler}
      >Войти</button>
      {error && <span>Некорректные данные</span>}
    </>
  );
};

export default NotAuthPanel;