
import {
  Theme,
  createStyles
} from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
  alertRoot: {
    cursor: 'pointer',
    background: '#fff',
    padding: 20,
    color: "#111",
    borderRadius: 12,
    width: 360,
    height: 58,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: -110,
    bottom: 40,
  },
  title: {
    display: 'inline-block',
    paddingLeft: 10,
  },
  icon: {
    color: '#00A790',
  }
})

export default styles