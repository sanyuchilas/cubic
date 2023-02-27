import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isError } from 'util';
import { useAppSelector } from '../../app/hooks';
import { gameSelector } from '../../app/selectors/gameSelector';
import { store } from '../../app/store';
import { finishGame } from '../../utils/finishGame';
import { getAnomalyText } from '../../utils/getAnomalyText';
import { myIntervals } from '../../utils/myIntervals';
import { myTimeouts } from '../../utils/myTomiouts';
import { spawnModal } from '../../utils/spawnModal';
import AuthPanel from '../AuthPanel/AuthPanel';
import NotAuthPanel from '../NotAuthPanel/NotAuthPanel';
import styles from './Panel.module.scss';

const Panel = () => {
  const {
    isAuth,
    time,
    rate,
    isDirty1,
    isDirty2,
    isBooted,
    isContramot1,
    isContramot2,
    isError
  } = useAppSelector(gameSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function everyInterval() {
    let accident = 0
    let random = Math.random()

    if (random > 0.975) {
      accident = 1
    }

    if (random < 0.015) {
      accident = -1
    }

    dispatch({type: 'game', payload: {
      time: store.getState().game.time + (3100 - rate) / 1000,
      workload: store.getState().game.workload + accident
    }})
  }

  useEffect(() => {
    if (isDirty1 && !myTimeouts.timeouts.size) {
      myTimeouts.create(() => {
        spawnModal(getAnomalyText(1), 10, navigate)
        finishGame(dispatch)
      } , 15000)
    }

    if (!isContramot1) {
      // Error
      if (!isError && time >= 30 && time < 2 * 60 + 30) {
        dispatch({type: 'game', payload: { isError: true }})
      }
      // Autoboot
      if (!isBooted && time >= 2 * 60 + 38 && time < 2 * 60 + 48) {
        dispatch({type: 'game', payload: { 
          isBooted: true,
          isAuth: true,
          isError: true,
        }})
      }
      // Reboot
      if (isBooted && time >= 2 * 60 + 30 && time < 2 * 60 + 38) {
        dispatch({type: 'game', payload: { 
          isBooted: false,
          isAuth: false,
          isError: false,
        }})
        myTimeouts.clearAll()
      }
      // Shutdown
      if (isBooted && time >= 3 * 60 + 30 && time < 8 * 60) {
        dispatch({type: 'game', payload: { 
          isBooted: false,
          isAuth: false
        }})
        myTimeouts.clearAll()
      }

      if (!isBooted && time >= 8 * 60) {
        dispatch({type: 'game', payload: { isBooted: true }})
      }
    } else {
      if (isBooted && time < (10 * 60 - 3 * 60 - 30) && time >= (10 - 8) * 60) {
        dispatch({type: 'game', payload: { 
          isBooted: false,
          isAuth: false
        }})
        myTimeouts.clearAll()
      }

      if (!isBooted && time < (10 - 8) * 60) {
        dispatch({type: 'game', payload: { isBooted: true }})
      }
    }

    if (isDirty2 && !myTimeouts.timeouts.size) {
      myTimeouts.create(() => {
        spawnModal(getAnomalyText(2), 10, navigate)
        finishGame(dispatch)
      } , 15000)
    }

    if (time >= 60 * 5) {
      spawnModal('T-16-G обнаружила внешнее подключение и самоуничтожилась...', 10, navigate)
      finishGame(dispatch)
    }
  }, [time])

  useEffect(() => {
    const intervalId = myIntervals.create(everyInterval, 3100 - rate)

    return () => myIntervals.clear(intervalId)
  }, [rate])

  function parseTime(time: number): string {
    let seconds: string | number
    let minutes: string | number

    if (time % 60 < 10) {
      seconds = '0' + time % 60
    } else {
      seconds = time % 60
    }

    if (Math.floor(time / 60) < 10) {
      minutes = '0' + Math.floor(time / 60)
    } else {
      minutes = Math.floor(time / 60)
    }

    return `${minutes}:${seconds}`
  }
  
  return (
    <div className={styles.panel}>
      <span className={styles.timer}>
        {parseTime(time)}
      </span>
      {isAuth ? <AuthPanel/> : <NotAuthPanel/>}
    </div>
  );
};

export default Panel;