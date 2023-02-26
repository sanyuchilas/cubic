import { useAppSelector } from '../../app/hooks';
import { gameSelector } from '../../app/selectors/gameSelector';
import AuthPanel from '../AuthPanel/AuthPanel';
import NotAuthPanel from '../NotAuthPanel/NotAuthPanel';
import styles from './Panel.module.scss';

const Panel = () => {
  const {isAuth} = useAppSelector(gameSelector)
  
  return (
    <div className={styles.panel}>
      {isAuth ? <AuthPanel/> : <NotAuthPanel/>}
    </div>
  );
};

export default Panel;