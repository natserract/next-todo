import {
  Theme,
  createStyles
} from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: 600,
    margin: '20px auto 0',
  },
  imgActivity: {
    width: '100%',
  }
})

export default styles