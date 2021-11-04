import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import styles from './styles'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useCallback, useState } from 'react';
import { TODO_ITEMS } from '../../constant/api';
import { post, update } from '../../api/API';
import { useRouter } from 'next/router';

const useStyles = makeStyles(styles);

const validationSchema = yup.object({
  title: yup.string().required(),
  priority: yup.string().required()
});

type Props = {
  type: 'add' | 'edit';
  openDialog: boolean;
  title: string;
  setOpenDialog: Function;
  onRefetch: Function;
  initialValues: {
    title: string;
    priority: string;
  }
  id?: string;
}

const TodoPopup: React.FC<Props> = (props) => {
  const classes = useStyles()
  const { query } = useRouter()
  const [selectState, setSelectState] = useState(
    props.type === 'add' ? "initial" : props.initialValues.priority
  );

  const formik = useFormik({
    initialValues: {
      ...props.initialValues
    },
    validationSchema,
    onSubmit: (values) => {
      const { title, priority } = values!!

      handlePostData({
        title,
        priority,
      })
    },
  })

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  const handlePostData = useCallback((values) => {
    const isAddAction = props.type === 'add'
    const url = isAddAction ? TODO_ITEMS : TODO_ITEMS + `/${props.id}`

    const onPost = async () => {
      try {
        const field = {
          "activity_group_id": query?.id,
          ...values,
        }

        if (isAddAction) {
          await post(url, { ...field })
        } else {
          await update(url, { ...field })
        }
      } catch (error) {
        console.error(error)
      } finally {
        handleClose()
        props.onRefetch()
        formik.resetForm()
      }
    }

    onPost()
  }, [handleClose, props.onRefetch, props.type])

  const handleSelectChange = (event) => {
    setSelectState(event.target.value);
    formik.setFieldValue('priority', event.target.value)
  };

  return (
    <Dialog data-cy={`modal-${props.type}`} className={classes.dialog} open={props.openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle} data-cy={`modal-${props.type}-title`}>
        {props.title}

        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent data-cy={`modal-${props.type}`} dividers className={classes.dialogContent}>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.formGroup}>
            <label htmlFor="title" data-cy={`modal-${props.type}-name-title`}>Nama List Item</label>
            <TextField
              rows={4}
              name="title"
              placeholder={`${props.type === "add" ? 'Tambahkan' : 'Ubah'}  nama list item`}
              value={formik.values.title}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              data-cy={`modal-${props.type}-name-input`}
              autoFocus
              className={
                `${formik.errors.title && formik.touched.title ? classes.formikErrors : null} ${classes.todoInput}`
              }
              autoComplete="off"
              required
            />
          </div>

          <div className={classes.formGroup}>
            <label htmlFor="priority" data-cy={`modal-${props.type}-priority-title`}>Priority</label>
            <Select
              name="priority"
              id="priority"
              value={selectState}
              onChange={handleSelectChange}
              data-cy={`modal-${props.type}-priority-input`}
              className={
                `${formik.errors.title && formik.touched.title ? classes.formikErrors : null} ${classes.todoCheck}`
              }
            >
              <MenuItem value="initial" disabled>Pilih Priority</MenuItem>
              <MenuItem value="very-high">Very High</MenuItem>
              <MenuItem value='high'>High</MenuItem>
              <MenuItem value='normal'>Medium</MenuItem>
              <MenuItem value='low'>Low</MenuItem>
              <MenuItem value='very-low'>Very Low</MenuItem>
            </Select>
          </div>
        </form>
      </DialogContent>

      <DialogActions>
        <Button data-cy={`modal-${props.type}-save-button`} type="submit" style={{ textTransform: 'capitalize', }} onClick={() => formik.handleSubmit()} variant="contained" color="primary">
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TodoPopup