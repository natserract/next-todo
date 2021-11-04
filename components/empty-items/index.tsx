import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import styles from './styles'

type Props = {
  path: string
}

const useStyles = makeStyles(styles)

const EmptyItems: React.FC<Props> = ({ path }) => {
  const classes = useStyles()
  const { route } = useRouter()
  const dataCy = route !== "/" ? 'todo' : 'activity'


  return (
    <div role="empty-items" data-cy={`${dataCy}-empty`} className={classes.container}>
      <img src={path} alt="Activity Not Yet Created" className={classes.imgActivity} />
    </div>
  )
}

export default EmptyItems