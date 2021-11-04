import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import KeyboardCapslockIcon from '@material-ui/icons/KeyboardCapslock';
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';
import styles from './styles'

const useStyles = makeStyles(styles)

const options = [
  'Terbaru',
  'Terlama',
  'A - Z',
  'Z - A',
  'Belum Selesai',
];

type Props = {
  setSelected: (index: number) => void
}

const Filter: React.FC<Props> = (props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    props.setSelected(index)
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderIcons = (index) => {
    switch (index) {
      case 0:
        return <KeyboardCapslockIcon />
      case 1:
        return <LowPriorityIcon />
      case 2:
        return <SortByAlphaIcon /> 
      case 3:
        return <SortByAlphaIcon /> 
      case 4:
        return <SyncDisabledIcon />
      default:
        return <React.Fragment />
    }
  }

  return (
    <React.Fragment>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
          className={classes.btnFilter}
        >
          <Button
            aria-controls="menu"
            aria-haspopup="true"
            onClick={handleClickListItem}
            variant="outlined"
            data-cy="todo-sort-button"
          >
            <ImportExportIcon data-cy="todo-sort-icon" />
          </Button>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            data-cy={index === selectedIndex ? 'sort-selection-selected' : null}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
            divider
          >
            <ListItemIcon data-cy="sort-selection-icon">
              {renderIcons(index)}
            </ListItemIcon>
            <ListItemText data-cy="sort-selection-title">
              {option}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}

export default Filter