import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { store } from '../../app/store';
import styles from './AuthPanel.module.scss';

const AuthPanel = () => {
  const {time, workload} = store.getState().game
  const dispatch = useAppDispatch()
  const [showPanel, setShowPanel] = useState(false)
  const [rateValue, setRateValue] = useState(2100)
  const onRateChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'game', payload: {
      workload: workload - (rateValue - +evt.target.value) / 500
    }})
    setRateValue(+evt.target.value)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      let accident = 0
      let random = Math.random()
      if (random > 0.95) {
        accident = 1
      }
      if (random < 0.05) {
        accident = -1
      }
      dispatch({type: 'game', payload: {
        time: store.getState().game.time + (3100 - rateValue) / 1000,
        workload: store.getState().game.workload + accident
      }})
    }, 3100 - rateValue)

    return () => clearInterval(intervalId)
  }, [rateValue])

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
    <>
      <button
        onClick={() => setShowPanel(!showPanel)}
      >{showPanel ? 'Спрятать панель' : 'Показать панель'}</button>
      {showPanel && 
        <>
          <div className={styles.data_rate}>
            <span>Получение данных</span>
            <select 
              name="date_rate" 
              id="data_rate_select"
              defaultValue={2100}
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
          <button>Трансгрессировать</button>
          <div className={styles.cts}>
            <div className={styles.cts_title}>
              <span><u>ЧВП1</u></span>
              <button 
                name='cts1'
              >Контрамоцировать</button>
            </div>
          </div>
          <button>Сломать контрамотор (ЧВП1)</button>
          <span>Reboot + Autoboot - 2:30 (ЧВП1)</span>
          <span>Shutdown - 3:30 (ЧВП1)</span>
          <div className={styles.cts}>
            <div className={styles.cts_title}>
              <span><u>ЧВП2</u></span>
              <button
                name='cts2'
                disabled
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