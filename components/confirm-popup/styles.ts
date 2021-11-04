
import {
  Theme,
  createStyles
} from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'center'
  },
  content: {
    padding: '10px 70px',
  },
  icon: {
    fontSize: 75,
    color: '#ED4C5C',
    marginBottom: 20
  },
  description: {
    color: '#111',
  },
  action: {
    margin: '15px 0',
    
    "& button": {
      margin: '0 9px'
    }
  },
  btnCancel: {
    background: '#F4F4F4',
  },
  btnSubmit: {
    background: '#ED4C5C',
    color: '#fff',

    "&:hover": {
      background: '#CE3A49',
    }
  }
})

export default styles