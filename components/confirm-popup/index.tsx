import { Dispatch, SetStateAction } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog className={classes.root} open={open}>
      <DialogContent className={classes.content}>
        <ErrorOutlineRoundedIcon className={classes.icon}/>
        <Typography 
          component="h3" 
          variant="h6" 
          className={classes.description} 
          dangerouslySetInnerHTML={{
            __html: message
          }} 
        />

        <div role="actions" className={classes.action}>
          <Button onClick={handleClose} className={classes.btnCancel}>Batal</Button>
          <Button className={classes.btnSubmit} onClick={onSubmit}>Hapus</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmPopup