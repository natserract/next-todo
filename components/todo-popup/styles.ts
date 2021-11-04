import {
  Theme,
  createStyles
} from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
  dialog: {
    "& .MuiPaper-root": {
      width: 550
    }
  },
  dialogTitle: {
    color: '#000',

    "& h2": {
      fontWeight: 'bold',
    }
  },
  dialogContent: {
    paddingBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  error: {
    fontSize: 13,
    color: 'red',
    position: 'absolute',
    bottom: '9px',
    left: 0,
  },
  formikErrors: {
    borderColor: 'red !important'
  },
  todoInput: {
    width: '100%',
    height: 42,
    border: 'solid 1px #e5e5e5',
    borderRadius: 7,
    padding: '4px 8px',
  },
  formGroup: {
    position: 'relative',

    "& label": {
      display: 'block',
      margin: '10px 0',
      textTransform: 'uppercase',
      color: '#000',
      fontSize: 13,
      fontWeight: 'bold',
    }
  },
  todoCheck: {
    width: '50%',

    [theme.breakpoints.only('xs')]: {
      width: '100%',
    }
  }
})

export default styles