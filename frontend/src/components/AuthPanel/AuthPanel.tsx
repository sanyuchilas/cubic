import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { gameSelector } from '../../app/selectors/gameSelector';
import { WIN_GAME_TEXT } from '../../utils/constants';
import { finishGame } from '../../utils/finishGame';
import { spawnModal } from '../../utils/spawnModal';
import styles from './AuthPanel.module.scss';

const AuthPanel = () => {
  const {
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

  function onTransgressClickHandler(evt: React.MouseEvent<HTMLButtonElement>) {
    if (workload <= 30) {
      spawnModal(WIN_GAME_TEXT, 10, navigate)
      finishGame(dispatch)
      return
    }

    setTrangressValue('Недостаточно мощности ЦП');
    (evt.target as HTMLButtonElement).disabled = true;
    const id = setTimeout(() => {
      setTrangressValue('Трансгрессировать C-16-O');
      (evt.target as HTMLButtonElement).disabled = false;
      clearTimeout(id)
    }, 1500)
  }

  function brokeContramotorClickHandler() {
    dispatch({
      type: 'game',
      payload: {
        isContramotor1Broken: true,
        workload: workload - 15,
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
          </div>
          <button
            onClick={onTransgressClickHandler}
          >{trangressValue}</button>
          <div className={styles.cts}>
            <div className={styles.cts_title}>
              <span><u>ЧВП1</u></span>
              <button 
                name='cts1'
                disabled={isContramotor1Broken || isDirty1}
                onClick={contramotorClickHandler}
              >Контрамоцировать</button>
            </div>
          </div>
          <button
            disabled={isContramotor1Broken}
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
                disabled={isDirty2}
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