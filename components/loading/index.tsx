import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

import styles from './styles'

const useStyles = makeStyles(styles)

const Loading = () => {
  const classes = useStyles()

  return (
    <div
      className={classes.containerPage}
    >
      <CircularProgress
        data-cy="loading-indicator"
        disableShrink
        size={40}
        className={classes.loading}
        color="primary"
      />
    </div>
  )
}

export default Loading
