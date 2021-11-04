import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles'
import { useRouter } from 'next/router'
import { toStrictLower } from '../../utils/utils';

type Props = {
  id: string;
  title: string;
  date: Date | string;
  onDelete: () => void
}

const useStyles = makeStyles(styles)

const ActivityCard: React.FC<Props> = ({ id, title, date, onDelete }) => {
  const classes = useStyles()
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault();
    router.push({
      pathname: `activity/${toStrictLower(title)}`,
      query: {
        id,
      }
    })
  }

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={classes.cardContentRoot} onClick={(e) => handleClick(e)}>
        <Typography component="h3" variant="h5" className={classes.title}>
          {title}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActRoot}>
        <time>{date}</time>
        <IconButton onClick={onDelete} aria-label="delete" className={classes.cardBtn}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
export default ActivityCard