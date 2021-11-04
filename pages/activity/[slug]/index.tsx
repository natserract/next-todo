import React, { useCallback, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from "next/router"
import ActivityHeader from '../../../components/activity-header';
import { ACTIVITY_GROUPS, TODO_ITEMS } from '../../../constant/api';
import { get, remove } from '../../../api/API';
import Grid from '@material-ui/core/Grid';
import ActivityPopup from '../../../components/activity-popup';
import styles from './styles'
import CardItems from './todo-items';
import TodoPopup from './todo-popup';
import ConfirmPopup from '../../../components/confirm-popup';
import AlertNotification from '../../../components/alert-notification';

const confirmMessage = "Apakah Anda yakin ingin menghapus item"

const useStyles = makeStyles(styles)

const DetailActivity = () => {
  const cs = useStyles()
  const router = useRouter()

  const [activityData, setActivityData] = useState({
    title: '',
    items: []
  })
  const [todoData, setTodoData] = useState({
    title: '',
    priority: '',
  })

  const todoItemRef = useRef('')

  const [loading, setLoading] = useState(false);
  const [itemEmpty, setItemEmpty] = useState(false)

  const [addTodoDialog, setAddTodoDialog] = useState(false);
  const [editTodoDialog, setEditTodoDialog] = useState(false);
  const [editActivityDialog, setEditActivityDialog] = useState(false);

  const [openConfirmPopup, setOpenConfirmPopup] = useState(false)
  const [visibleAlert, setVisibleAlert] = useState(false)

  const todoRef = useRef({
    id: "",
    title: "",
  })

  const fetchDataById = () => {
    const url = ACTIVITY_GROUPS + `/${router.query?.id}`

    const onFetch = async () => {
      try {
        const responses = await get(url)

        setActivityData({
          title: responses?.title,
          items: responses?.todo_items
        })
        setLoading(false)

      } catch (error) {
        console.error(error)
        setLoading(true)
      }
    }

    onFetch()
  }

  useEffect(fetchDataById, []);

  const handleDetailTodo = (id: string) => {
    todoItemRef.current = id

    const onFetch = async () => {
      const url = TODO_ITEMS + `/${id}`

      try {
        const responses = await get(url)

        setTodoData({
          title: responses?.title,
          priority: responses?.priority
        })
        setEditTodoDialog(true)
      } catch (error) {
        console.error(error)
        setEditTodoDialog(false)
      }
    }

    onFetch()
  }

  const handleDelete = ({ id, title }) => {
    setOpenConfirmPopup(true)
    todoRef.current = { id, title }
  }

  const confirmDelete = useCallback(() => {
    const { id } = todoRef.current
    const url = TODO_ITEMS + `/${id}`
    
    setVisibleAlert(true)
    
    const onDelete = async () => {
      try {
        await remove(url)
        fetchDataById()
      } catch (error) {
        console.error(error)
      } finally {
        setOpenConfirmPopup(false)
      }
    }

    onDelete()
  }, [fetchDataById])

  const renderChildDialog = () => {
    const initialTodoValues = {
      "title": "",
      "priority": ""
    }

    if (addTodoDialog) return (
      <TodoPopup
        type="add"
        title="Tambah List Item"
        initialValues={{ ...initialTodoValues }}
        openDialog={addTodoDialog}
        setOpenDialog={setAddTodoDialog}
        onRefetch={fetchDataById}
      />
    )

    if (editTodoDialog) return (
      <TodoPopup
        id={todoItemRef.current}
        type="edit"
        title="Ubah List Item"
        initialValues={{ ...todoData }}
        openDialog={editTodoDialog}
        setOpenDialog={setEditTodoDialog}
        onRefetch={fetchDataById}
      />
    )

    if (editActivityDialog) return (
      <ActivityPopup
        type="edit"
        title="Edit Activity"
        initialValues={{ activityName: activityData?.title }}
        openDialog={editActivityDialog}
        setOpenDialog={setEditActivityDialog}
        onRefetch={fetchDataById}
      />
    )

    return <React.Fragment />
  }

  return (
    <div role="detailActivity">
      <ActivityHeader
        title={activityData?.title || "Loading..."}
        onClick={() => setAddTodoDialog(true)}
        onUpdate={() => setEditActivityDialog(true)}
        children={renderChildDialog()}
      />

      <Grid container spacing={3} alignItems="stretch">
        <CardItems
          items={activityData.items}
          itemEmpty={itemEmpty}
          setItemEmpty={setItemEmpty}
          onEdit={handleDetailTodo}
          onDelete={handleDelete}
        />
      </Grid>

      <ConfirmPopup
        open={openConfirmPopup}
        setOpen={setOpenConfirmPopup}
        message={`${confirmMessage} <b>"${todoRef.current?.title}</b>"`}
        onSubmit={confirmDelete}
      />

      <AlertNotification
        visibleAlert={visibleAlert}
        setVisibleAlert={setVisibleAlert}
        title="Item berhasil dihapus"
      />
    </div>
  )
}

export default DetailActivity