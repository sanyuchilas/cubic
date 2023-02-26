import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { gameSelector } from '../../app/selectors/gameSelector';
import { store } from '../../app/store';
import { spawModal } from '../../utils/spawnModal';
import styles from './AuthPanel.module.scss';

const AuthPanel = () => {
  const {
    time, 
    workload, 
    isContramot1, 
    isContramot2,
    isContramotor1Broken,
    rate,
    showPanel,
    isDirty1,
    isDirty2,
  } = useAppSelector(gameSelector)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [trangressValue, setTrangressValue] = useState('Трансгрессировать C-16-O')
  const onRateChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'game', payload: {
      workload: workload - (rate - +evt.target.value) / 500
    }})
    dispatch({type: 'game', payload: { rate: +evt.target.value }})
  }

  function everyInterval() {
    let accident = 0
    let random = Math.random()
    if (random > 0.975) {
      accident = 1
    }
    if (random < 0.025) {
      accident = -1
    }
    dispatch({type: 'game', payload: {
      time: store.getState().game.time + (3100 - rate) / 1000,
      workload: store.getState().game.workload + accident
    }})
  }

  useEffect(() => {
    const intervalId = setInterval(everyInterval, 3100 - rate)

    return () => clearInterval(intervalId)
  }, [rate])

  function onTransgressClickHandler(evt: React.MouseEvent<HTMLButtonElement>) {
    if (workload <= 20) {
      console.log('Победа')
      return
    }
    spawModal('a')
    setTrangressValue('Недостаточно мощности ЦП');
    (evt.target as HTMLButtonElement).disabled = true;
    setTimeout(() => {
      setTrangressValue('Трансгрессировать C-16-O');
    (evt.target as HTMLButtonElement).disabled = false;
    }, 1500)
  }

  function brokeContramotorClickHandler() {
    dispatch({
      type: 'game',
      payload: {
        isContramotor1Broken: true,
        workload: workload - 10,
        isDirty1: true,
        isDirty2: true
      }
    })
  }

  function togglePanelClickHandler() {
    dispatch({
      type: 'game',
      payload: {
        showPanel: !showPanel
      }
    })
  }

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

  function contramotorClickHandler(evt: React.MouseEvent<HTMLButtonElement>) {
    const { name } = evt.target as HTMLButtonElement
    if (name === 'cts1') {
      dispatch({
        type: 'game',
        payload: {
          isContramot1: !isContramot1
        }
      })
    } else if (name === 'cts2') {
      dispatch({
        type: 'game',
        payload: {
          isContramot2: !isContramot2
        }
      })
    }
  }

  return (
    <>
      <button
        onClick={togglePanelClickHandler}
      >{showPanel ? 'Спрятать панель' : 'Показать панель'} T-16-G</button>
      {showPanel && 
        <>
          <div className={styles.data_rate}>
            <span>Получение данных</span>
            <select 
              name="date_rate" 
              id="data_rate_select"
              defaultValue={rate}
              className={styles.data_rate_select}
              onChange={onRateChange}
            >
              <option value="100">100 Мбит/с</option>
              <option value="1100">1100 Мбит/с</option>
              <option value="2100">2100 Мбит/с</option>
            </select>
          </div>
          <div className={styles.header}>
            <span className={styles.workload}>
              Нагрузка на ЦП: {workload}%
            </span>
            <span className={styles.timer}>
              {parseTime(time)}
            </span>
          </div>
          <button
            onClick={onTransgressClickHandler}
          >{trangressValue}</button>
          <div className={styles.cts}>
            <div className={styles.cts_title}>
              <span><u>ЧВП1</u></span>
              <button 
                name='cts1'
                disabled={isContramotor1Broken}
                onClick={contramotorClickHandler}
              >Контрамоцировать</button>
            </div>
          </div>
          <button
            disabled={isDirty2}
            onClick={brokeContramotorClickHandler}
          >
            Сломать контрамотор (ЧВП1)
          </button>
          <span>Reboot + Autoboot - 2:30 (ЧВП1)</span>
          <span>Shutdown - 3:30 (ЧВП1)</span>
          <span>Autoboot - 7:00 (ЧВП1)</span>
          <div className={styles.cts}>
            <div className={styles.cts_title}>
              <span><u>ЧВП2</u></span>
              <button
                name='cts2'
                disabled={isDirty1}
                onClick={contramotorClickHandler}
              >Контрамоцировать</button>
            </div>
          </div>
          <span>Cooling - 6:00 (ЧВП2)</span>
        </>
      }
    </>
  );
};

export default AuthPanel;