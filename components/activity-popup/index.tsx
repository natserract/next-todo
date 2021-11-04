import React, { useCallback, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import styles from './styles'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as yup from 'yup';
import { useFormik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router';
import { post, update } from '../../api/API';
import { ACTIVITY_GROUPS } from '../../constant/api';
import { toStrictLower } from '../../utils/utils';

type Props = {
  type: 'add' | 'edit',
  openDialog: boolean;
  title: string;
  setOpenDialog: Function;
  onRefetch: Function
  initialValues: {
    activityName: string;
  };
}

const validationSchema = yup.object({
  activityName: yup.string().required(),
});

const useStyles = makeStyles(styles);

const ActivityPopup: React.FC<Props> = (props) => {
  const classes = useStyles()
  const { query, asPath, replace: routeRepl } = useRouter()
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      ...props.initialValues
    },
    validationSchema,
    onSubmit: (values) => {
      const { activityName } = values!!

      handlePostData(activityName)
    },
  })

  const handlePostData = useCallback((title: string) => {
    const isAddAction = props.type === 'add'
    const url = isAddAction ? ACTIVITY_GROUPS : ACTIVITY_GROUPS + `/${query?.id}`

    const manual = {
      email: "notfound@gmail.com",
      comment: "Comment confirmed!"
    }

    const changeUrl = () => {
      const prevSlug = query?.slug as string
      const prevUrl = asPath

      const newUrl = prevUrl.replace(prevSlug, toStrictLower(title))
      routeRepl(newUrl)
    }

    const onPost = async () => {
      try {
        const field = { title, ...manual }

        if (isAddAction) {
          await post(url, { ...field })
        } else {
          await update(url, { ...field })
        }

        setLoading(false)
        formik.resetForm()
      }
      catch (error) {
        setLoading(true)
      }
      finally {
        handleClose()
        props.onRefetch()
        changeUrl()
      }
    }

    onPost()
  }, [props.onRefetch, props.type])

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  return (
    <Dialog data-cy={`modal-${props.type}`} className={classes.dialog} open={props.openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle} data-cy={`modal-${props.type}-title`}>
        {props.title}

        <IconButton data-cy={`${props.type}-activity-close-btn`} aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent data-cy={`modal-${props.type}`} dividers className={classes.dialogContent}>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.formGroup}>
            <label htmlFor="activityName" data-cy={`modal-${props.type}-name-title`}>Nama Activity</label>
            <TextField
              rows={4}
              name="activityName"
              placeholder="Tambahkan nama activity"
              value={formik.values.activityName}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoFocus
              data-cy={`modal-${props.type}-name-input`}
              className={
                `${formik.errors.activityName && formik.touched.activityName ? classes.formikErrors : null} ${classes.activityNameInput}`
              }
              autoComplete="off"
              required
            />
          </div>
        </form>
      </DialogContent>

      <DialogActions>
        <Button disabled={!!formik.errors.activityName} data-cy={`modal-${props.type}-save-button`} type="submit" style={{ textTransform: 'capitalize' }} onClick={() => formik.handleSubmit()} variant="contained" color="primary">
          {loading && <CircularProgress color="secondary" />} Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ActivityPopup