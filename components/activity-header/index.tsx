import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import styles from './styles'
import { useRouter } from 'next/router';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

type Props = {
  title: string | string[];
  children: React.ReactNode;
  onClick: () => void;
  onUpdate?: () => void;
}

const useStyles = makeStyles(styles)

const ActivityHeader: React.FC<Props> = (props) => {
  const classes = useStyles()
  const router = useRouter()

  const handlePrevious = () => {
    router.back()
  }

  return (
    <React.Fragment>
      <div className={classes.activityContainer}>
        <aside className={classes.asideLeft}>
          {router.route !== "/" &&
            <Button
              className={classes.btnPrev}
              size="large"
              startIcon={<ArrowBackIosRoundedIcon />}
              color="inherit"
              disableRipple
              onClick={handlePrevious}
            />
          }

          <Typography className={classes.activityTitle} component="h2" variant="h4">
            {props.title}
          </Typography>

          {props.onUpdate &&
            <Button
              variant="text"
              color="inherit"
              startIcon={<CreateRoundedIcon />}
              className={classes.btnEdit}
              onClick={props.onUpdate}
              disableRipple
            />
          }
        </aside>
        <aside>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.btnAdd}
            onClick={props.onClick}
          >
            Tambah
          </Button>
        </aside>
      </div>

      {props.children}
    </React.Fragment>
  )
}

export default ActivityHeader
