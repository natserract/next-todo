import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Tooltip } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    paddingTop: 15,
    textTransform: 'uppercase',
    color: '#fff',

    "& h3": {
      fontSize: 24,
    }
  },
  appBar: {
    background: '#16ABF8',
  }
}));

const Header: React.FC = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static" data-cy="header-background" color="transparent" className={classes.appBar}>
      <Toolbar>
        <Container maxWidth="md">
          <Link href="/">
            <a className={classes.title}>
              <Typography variant="h3" data-cy="header-title">
                <b>To Do List App</b>
              </Typography>
            </a>
          </Link>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
