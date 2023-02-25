import styles from './App.module.scss';
import AppRouter from './components/AppRouter/AppRouter';

function App() {
  return (
    <div className={styles.app} >
      <AppRouter/>
    </div>
  );
}

export default App;