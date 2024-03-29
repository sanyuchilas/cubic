import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { gameSelector } from '../../app/selectors/gameSelector';
import { store } from '../../app/store';
import { getAnomalyText } from '../../utils/getAnomalyText';
import { myIntervals } from '../../utils/myIntervals';
import { myTimeouts } from '../../utils/myTomiouts';
import { spawnModal } from '../../utils/spawnModal';
import AuthPanel from '../AuthPanel/AuthPanel';
import NotAuthPanel from '../NotAuthPanel/NotAuthPanel';
import styles from './Panel.module.scss';

const Panel = () => {
  const {
    isBooted,
    time,
    rate,
    isDirty1,
    isDirty2,
    isContramot1,
    isContramot2,
    isError,
    isAuth,
    workload,
    freezeEffect,
    isContramot1Broken,
    isFreezeEnd
  } = useAppSelector(gameSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({
      type: 'game',
      payload: {
        workload: workload + (isContramot2 ? -freezeEffect : freezeEffect)
      }
    })
  }, [isContramot2])

  useEffect(() => {
    dispatch({
      type: 'game',
      payload: {
        workload: workload + freezeEffect
      }
    })
  }, [isFreezeEnd])

  function randomizeWorkload() {
    let random = Math.random()
    if (random > 0.9) return 1
    if (random < 0.1) return -1
    return 0
  }

  function everyInterval() {
    let randomize = randomizeWorkload()
    const isMaxFreezed = store.getState().game.isMaxFreezed
    const isFreezeEnd = store.getState().game.isFreezeEnd
    const time = store.getState().game.time
    const rate = store.getState().game.rate
    const workload = store.getState().game.workload
    const isContramot2 = store.getState().game.isContramot2
    let freezeChange = 0
    const freezeEffect = store.getState().game.freezeEffect

    if (isContramot2 && time <= 240 && time % 2 === 0) {
      freezeChange = Math.floor(time / 120) + 
        (Math.floor(time / 120) >= 1 ? (3100 - rate) / 1000 : 1) - 1
    }

    if (isMaxFreezed || isFreezeEnd) {
      randomize = 0
      freezeChange = 0
    }
    
    let finalFreezeEffect = Math.min(freezeEffect + freezeChange, 40)
    let finalWorkload = Math.max(0, Math.min(100, workload + randomize - freezeChange))

    dispatch({type: 'game', payload: {
      time: time + (3100 - rate) / 1000,
      workload: finalWorkload,
      freezeEffect: finalFreezeEffect,
      randomize: store.getState().game.randomize + randomize,
      isMaxFreezed: finalFreezeEffect === 40 || isMaxFreezed,
      isFreezeEnd: time > 240 || isFreezeEnd
    }})
  }

  useEffect(() => {
    if (isDirty1 && isBooted && !myTimeouts.timeouts.size) {
      myTimeouts.create(() => {
        spawnModal(getAnomalyText(1), 10, navigate, dispatch)
      } , 15000)
    }

    if (isDirty2 && isBooted && !myTimeouts.timeouts.size) {
      myTimeouts.create(() => {
        spawnModal(getAnomalyText(2), 10, navigate, dispatch)
      } , 15000)
    }

    if (!isContramot1) {
      // Error
      if (!isError && time >= 15 && time < 2 * 60 + 30) {
        dispatch({type: 'game', payload: { isError: true }})
      }

      // Reboot + Autoboot start
      if (!isAuth && isBooted && time >= 2 * 60 + 30 && time < 2 * 60 + 35) {
        dispatch({type: 'game', payload: { 
          isBooted: false,
          isBooting: true,
          isDirty1: false,
          isDirty2: false,
          isError: false,
        }})
        myTimeouts.clearAll()
        const timeoutId = myTimeouts.create(() => {
          dispatch({type: 'game', payload: { 
            isBooted: true,
            isBooting: false,
          }})
          myTimeouts.clear(timeoutId)
        }, 5000)
      }

      // Shutdown
      if (!isAuth && isBooted && time >= 3 * 60 + 30 && time < 7 * 60) {
        dispatch({type: 'game', payload: { 
          isBooted: false,
          isShutdowning: true,
        }})
        myTimeouts.clearAll()
        const timeoutId = myTimeouts.create(() => {
          dispatch({type: 'game', payload: { 
            isShutdowning: false,
          }})
          myTimeouts.clear(timeoutId)
        }, 5000)
      }
    } else {
      // Error
      if (isError && time < (10 * 60 - 2 * 60 - 30)) {
        dispatch({type: 'game', payload: { isError: false }})
      }

      // Shutdown
      if (!isAuth && isBooted && time < (10 * 60 - 3 * 60 - 30) 
      && time >= ((10 - 7) * 60 )) {
        dispatch({type: 'game', payload: { 
          isBooted: false,
          isBooting: true,
          isContramotor1Broken: false,
          workload: isContramot1Broken ? workload + 18 : workload,
          isDirty1: false,
          isDirty2: false
        }})
        myTimeouts.clearAll()
        const timeoutId = myTimeouts.create(() => {
          dispatch({type: 'game', payload: { 
            isBooting: false,
          }})
          myTimeouts.clear(timeoutId)
        }, 5000)
      }

      // Autoboot
      if (!isAuth && !isBooted && time < ((10 - 7) * 60 )) {
        dispatch({type: 'game', payload: { isBooted: true }})
      }
    }

    if (time >= 60 * 5) {
      spawnModal('T-16-G обнаружила внешнее подключение и самоуничтожилась...', 10, navigate, dispatch)
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
      {isBooted ? <AuthPanel/> : <NotAuthPanel/>}
    </div>
  );
};

export default Panel;