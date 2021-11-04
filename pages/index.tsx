import { makeStyles } from '@material-ui/core/styles';
import Activity from './activity'
import styles from './styles'

type HomeProps = {} 

const useStyles = makeStyles(styles)

const Home: React.FC<HomeProps> = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Activity />
    </div>
  );
}

export default Home;