import { NavLink } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import { SANDBOX_ROUTE, HELP_ROUTE, GAME_ROUTE } from '../../utils/constants';
import styles from './MainPage.module.scss';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <NavLink to={SANDBOX_ROUTE}>
        <Button
          btnType='white'
        >
          Sandbox
        </Button>
      </NavLink>
      <NavLink to={GAME_ROUTE}>
        <Button
          btnType='white_fill'
        >
          Play
        </Button>
      </NavLink>
      <NavLink to={HELP_ROUTE}>
        <Button
          btnType='white'
        >
          Help
        </Button>
      </NavLink>
    </div>
  );
};

export default MainPage;