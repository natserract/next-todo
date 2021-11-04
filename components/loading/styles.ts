import {
  Theme,
  createStyles
} from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
  loading: {
    fontSize: '5rem',
    height: '5rem',
    lineHeight: '3rem',
  },
  containerPage: {
    width: '100%',
    height: 'calc(-180px + 100vh)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default styles