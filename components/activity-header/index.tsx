import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { useRouter } from 'next/router';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import Filter from './filter';
import styles from './styles'
import { toStrictLower } from '../../utils/utils';

type Props = {
  title: string | string[];
  children: React.ReactNode;
  onClick: () => void;
  onUpdate?: () => void;
  
  // Only when edit action
  setSelected?: (index: number) => void
}

const useStyles = makeStyles(styles)

const ActivityHeader: React.FC<Props> = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const dataCy = router.route !== "/" ? 'todo' : 'activity'

  const handlePrevious = () => {
    router.back()
  }

  return (
    <React.Fragment>
      <div className={classes.activityContainer}>
        <aside className={classes.asideLeft}>
          {router.route !== "/" &&
            <Button
              data-cy={`${dataCy}-back-button`}
              className={classes.btnPrev}
              size="large"
              startIcon={<ArrowBackIosRoundedIcon data-cy={`${dataCy}-back-button-icon`}/>}
              color="inherit"
              disableRipple
              onClick={handlePrevious}
            />
          }

          <Typography data-cy={`${dataCy}-title`} className={classes.activityTitle} component="h2" variant="h4">
            {props.title}
          </Typography>

          {props.onUpdate &&
            <Button
              variant="text"
              color="inherit"
              startIcon={<CreateRoundedIcon data-cy="todo-title-edit-button-icon"/>}
              className={classes.btnEdit}
              onClick={props.onUpdate}
              data-cy="todo-title-edit-button"
              disableRipple
            />
          }
        </aside>
        <aside className={classes.asideRight}>
          {router.route !== "/" && <Filter setSelected={props.setSelected} />}
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.btnAdd}
            onClick={props.onClick}
            data-cy={`${dataCy}-add-button`}
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
