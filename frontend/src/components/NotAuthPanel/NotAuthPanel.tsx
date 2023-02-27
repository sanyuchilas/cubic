import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { gameSelector } from '../../app/selectors/gameSelector';
import { finishGame } from '../../utils/finishGame';
import { myTimeouts } from '../../utils/myTomiouts';
import { spawnModal } from '../../utils/spawnModal';
import styles from './NotAuthPanel.module.scss';

const login = 'C-32-O'
const password = 'ihelpyou'

const NotAuthPanel = () => {
  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isBooting, isShutdowning } = useAppSelector(gameSelector)

  function onBtnClickHandler() {
    if (passwordValue === password && login === loginValue) {
      dispatch({type: 'game', payload: {
        isAuth: true,
        isBooted: true
      }})
      myTimeouts.create(() => {
        spawnModal('T-16-G обнаружила внешнее подключение и самоуничтожилась...', 10, navigate)
        finishGame(dispatch)
      }, 20000)
      return
    }

    setError(true)
  }
  
  return (
    <>
      {!isBooting && !isShutdowning
      ?
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
      : `${isBooting ? 'Booting...' : 'Shutdowning...'}`}
    </>
  );
};

export default NotAuthPanel;