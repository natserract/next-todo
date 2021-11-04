import { makeStyles } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Fade from '@material-ui/core/Fade';
import styles from './styles'
import { useEffect } from 'react';

type Props = {
  title: string
  visibleAlert: boolean;
  setVisibleAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles(styles)

const AlertNotification: React.FC<Props> = ({ title, visibleAlert, setVisibleAlert }) => {
  const classes = useStyles()

  const handleAlert = () => {
    setVisibleAlert(false)
  }

  // Give a alert timeout
  useEffect(() => {
    let timerFunc = setTimeout(() => {
      setVisibleAlert(false)
    }, 3000);

    return () => clearTimeout(timerFunc);
  }, [visibleAlert])

  return (
    <Fade in={visibleAlert}>
      <div role="alert" data-cy="alert-notification" className={classes.alertRoot} onClick={handleAlert}>
        <ErrorOutlineIcon className={classes.icon} />
        <span className={classes.title}>{title}</span>
      </div>
    </Fade>
  )
}

export default AlertNotification