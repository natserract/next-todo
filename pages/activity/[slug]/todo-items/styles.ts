import {
  Theme,
  createStyles
} from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
  root: {
    padding: "10px 20px",
    height: 70,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',

    "& .MuiTypography-root": {
      marginLeft: 25,
    }
  },
  formLabel: {
    width: '100%',
  },
  prior: {
    width: 10,
    height: 9,
    borderRadius: '50%',
    position: 'absolute',
    left: "6.5%",
  },
  sup: {
    "& span.MuiFormControlLabel-label": {
      position: "relative",
    },
    "& span.MuiFormControlLabel-label:after": {
      content: `""`,
      position: 'absolute',
      width: 60,
      height: 2,
      background: 'rgb(102, 102, 102)',
      left: -3,
      bottom: "50%",
    }
  },
  btnEdit: {
    width: 70,
    minWidth: 70,
    color: '#A4A4A4',

    "&:hover": {
      background: 'transparent'
    }
  },
  middle: {
    display: 'flex',
  }
})

export default styles