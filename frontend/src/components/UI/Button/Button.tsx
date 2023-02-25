import styles from './Button.module.scss';
import cn from 'classnames'
import { BtnPropsType } from './ButtonTypes';


const Button = ({btnType, children, ...props}: BtnPropsType) => {
  return (
    <button 
      className={cn(styles.btn, styles[btnType])}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;