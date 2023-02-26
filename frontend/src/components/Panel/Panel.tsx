import React, { useEffect, useState } from 'react';
import styles from './Panel.module.scss'

const Panel = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(cur => cur + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

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
      <div className={styles.data_rate}>
        <span>Получение данных</span>
        <select 
          name="date_rate" 
          id="data_rate_select"
          defaultValue={1024}
          className={styles.data_rate_select}
          onChange={(evt) => console.log(evt.target.value)}
        >
          <option value="50">50 Мбит/с</option>
          <option value="100">100 Мбит/с</option>
          <option value="1024">1024 Мбит/с</option>
        </select>
      </div>
      <div className={styles.header}>
        <span className={styles.workload}>
          Нагрузка на ЦП: 73%
        </span>
        <span className={styles.timer}>
          {parseTime(time)}
        </span>
      </div>
      <button>Трансгрессировать</button>
      <div className={styles.cts}>
        <div className={styles.cts_title}>
          <span><u>ЧВП1</u></span>
          <button disabled>Контрамоцировать</button>
        </div>
      </div>
      <button>Сломать контрамотор (ЧВП1)</button>
      <span>Reboot + Autoboot - 2:30 (ЧВП1)</span>
      <span>Shutdown - 3:30 (ЧВП1)</span>
    </div>
  );
};

export default Panel;