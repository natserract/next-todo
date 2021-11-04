import React, { useCallback } from 'react';
import Header from './header';
import { makeStyles } from '@material-ui/core';
import styles from './styles'
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(styles);

const Layout: React.FC = (props) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="md" className={classes.layout}>
        {props.children}
      </Container>
    </React.Fragment>
  );
};

export default Layout;
