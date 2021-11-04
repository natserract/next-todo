import { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './styles'
import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { mappingColorPriority } from '../../utils/utils';
import EmptyItems from '../empty-items';
import { TODO_ITEMS } from '../../constant/api';
import { update } from '../../api/API';
import Button from '@material-ui/core/Button';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

type Props = {
  items: Array<any>;
  itemEmpty: boolean;
  setItemEmpty: Function;
  onEdit: (id: string) => void;
  onDelete: (v: { id: string, title: string }) => void;
}

const useStyles = makeStyles(styles)

const CardItems: React.FC<Props> = (props) => {
  const cs = useStyles()
  const checkedRef = useRef({})
  
  const [checkedState, setCheckedState] = useState({});

  // Create initial state for checkBox
  useEffect(() => {
    Object.keys(props.items).map(v => {
      checkedRef.current[`checked_${props.items[v].id}`] = props.items[v]['is_active'] === 0
    })

    setCheckedState({ ...checkedRef.current })
  }, [props.items])

  const handleCheckChange = (event) => {
    const id = event.target.name.split('_')[1]
    const value = event.target.checked ? 0 : 1

    setCheckedState(
      {
        ...checkedState,
        [event.target.name]:
          event.target.checked
      });
    handleComplete(id, value)
  };

  const handleComplete = (id: string, value: number) => {
    const url = TODO_ITEMS + `/${id}`

    const onUpdate = async () => {
      try {
        await update(url, {
          "is_active": value,
        })
      } catch (error) {
        console.error(error)
      }
    }

    onUpdate()
  }

  const handleDelete = (v) => {
    props.onDelete(v)
  }

  const handleEdit = (id: string) => {
    props.onEdit(id)
  }

  const renderItems = () => {
    if (props.itemEmpty) return <EmptyItems path="../todo-empty-state.png" />

    return props.items.map((v, idx) => {
      const key = `checked_${v.id}`

      return (
        <Grid item sm={12} key={key}>
          <Card className={cs.root}>
            <span
              role="priority"
              className={cs.prior}
              style={{ background: mappingColorPriority(v.priority) }}
            />

            <div role="middle" className={cs.middle}> 
              <FormControlLabel
                className={`${cs.formLabel} ${v.is_active === 0 ? cs.sup : null}`}
                key={idx}
                control={
                  // Issues: Component is changing the controlled value state of Select to be uncontrolled.
                  // Solve by: https://stackoverflow.com/questions/69259429/material-ui-a-component-is-changing-the-uncontrolled-checked-state-of-switchbas
                  <Checkbox
                    color="primary"
                    checked={!!checkedState[key]}
                    onChange={handleCheckChange}
                    name={key}
                  />
                }
                label={v.title}
              />

              <Button
                variant="text"
                color="inherit"
                startIcon={<CreateRoundedIcon />}
                className={cs.btnEdit}
                onClick={() => handleEdit(v.id)}
                disableRipple
              />
            </div>

            <IconButton onClick={() => handleDelete({ id: v.id, title: v.title })} aria-label="delete">
              <DeleteOutlineIcon />
            </IconButton>
          </Card>
        </Grid>
      )
    })
  }

  return <React.Fragment children={renderItems()} />
}

export default CardItems