import React, { useEffect, useState } from 'react';
import AuthPanel from '../AuthPanel/AuthPanel';
import NotAuthPanel from '../NotAuthPanel/NotAuthPanel';
import styles from './Panel.module.scss'

const Panel = () => {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <div className={styles.panel}>
      {isAuth ? <AuthPanel/> : <NotAuthPanel/>}
    </div>
  );
};

export default Panel;