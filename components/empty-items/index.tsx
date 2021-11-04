import { makeStyles } from '@material-ui/core/styles';
import styles from './styles'

type Props = {
  path: string
}

const useStyles = makeStyles(styles)

const EmptyItems: React.FC<Props> = ({ path }) => {
  const classes = useStyles()

  return (
    <div role="empty-items" className={classes.container}>
      <img src={path} alt="Activity Not Yet Created" className={classes.imgActivity} />
    </div>
  )
}

export default EmptyItems