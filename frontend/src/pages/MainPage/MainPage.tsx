import Button from '../../components/UI/Button/Button';
import styles from './MainPage.module.scss';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <Button
        btnType='white'
      >
        Sandbox
      </Button>
      <Button
        btnType='white_fill'
      >
        Play
      </Button>
      <Button
        btnType='white'
      >
        Help
      </Button>
    </div>
  );
};

export default MainPage;