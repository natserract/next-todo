import { Dispatch, SetStateAction } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router';
import styles from './styles'

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: any;
  onSubmit: () => void;
}

const useStyles = makeStyles(styles);

const ConfirmPopup: React.FC<Props> = ({ open, setOpen, message, onSubmit }) => {
  const classes = useStyles()
  const { route } = useRouter()
  const dataCy = route !== "/" ? 'todo' : 'activity'


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog className={classes.root} open={open}>
      <DialogContent data-cy={`${dataCy}-modal-delete`} className={classes.content}>
        <ErrorOutlineRoundedIcon data-cy={`${dataCy}-modal-delete-icon`} className={classes.icon}/>
        <Typography 
          component="h3" 
          variant="h6" 
          className={classes.description} 
          data-cy={`${dataCy}-modal-delete-text`}
          dangerouslySetInnerHTML={{
            __html: message
          }} 
        />

        <div role="actions" className={classes.action}>
          <Button data-cy={`${dataCy}-modal-delete-cancel-button`} onClick={handleClose} className={classes.btnCancel}>Batal</Button>
          <Button data-cy={`${dataCy}-modal-delete-confirm-button`} className={classes.btnSubmit} onClick={onSubmit}>Hapus</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmPopup