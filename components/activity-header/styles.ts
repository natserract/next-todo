import {
  Theme,
  createStyles
} from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
  activityContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  activityTitle: {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  asideLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  btnPrev: {
    width: 10,
    color: "#111",
    padding: '0',
    minWidth: '10px',
    marginRight: 10,

    "&:hover": {
      background: 'transparent'
    }
  },
  btnAdd: {
    textTransform: 'capitalize',
  },
  btnEdit: {
    width: 70,
    minWidth: 70,
    color: '#A4A4A4',

    "&:hover": {
      background: 'transparent'
    }
  }
})

export default styles