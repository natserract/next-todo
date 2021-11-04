import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from "next/router"
import ActivityHeader from '../../../components/activity-header';
import { ACTIVITY_GROUPS, TODO_ITEMS } from '../../../constant/api';
import { get, remove } from '../../../api/API';
import Grid from '@material-ui/core/Grid';
import ActivityPopup from '../../../components/activity-popup';
import TodoItems from '../../../components/todo-items';
import TodoPopup from '../../../components/todo-popup';
import ConfirmPopup from '../../../components/confirm-popup';
import AlertNotification from '../../../components/alert-notification';
import { sortBy } from '../../../utils/utils';

const confirmMessage = "Apakah Anda yakin ingin menghapus item"

const DetailActivity = () => {
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
  const [addTodoDialog, setAddTodoDialog] = useState(false);
  const [editTodoDialog, setEditTodoDialog] = useState(false);
  const [editActivityDialog, setEditActivityDialog] = useState(false);

  const [openConfirmPopup, setOpenConfirmPopup] = useState(false)
  const [visibleAlert, setVisibleAlert] = useState(false)

  const todoRef = useRef({
    id: "",
    title: "",
  })
  const mounted = useRef(false);

  const fetchDataById = () => {
    mounted.current = true
    const url = ACTIVITY_GROUPS + `/${router.query?.id}`

    const onFetch = async () => {
      try {
        const responses = await get(url)

        if (mounted.current) {
          setActivityData({
            title: responses?.title,
            items: responses?.todo_items
          })
          setLoading(false)
        }

      } catch (error) {
        console.error(error)
        setLoading(true)
      } finally {
        setLoading(false)
      }
    }

    onFetch()
  }

  useEffect(() => {
    fetchDataById()

    return () => {
      mounted.current = false
    }
  }, []);

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

  const handleSetSelected = useCallback((selectedIndex: number) => {
    const { items } = activityData
    let _newItems: any[] = []

    switch (selectedIndex) {
      case 0:
        _newItems = sortBy(items, { prop: "id", desc: true })
        break;
      case 1:
        _newItems = sortBy(items, { prop: "id" })
        break;
      case 2:
        _newItems = sortBy(items, { prop: "title" })
        break;
      case 3:
        _newItems = sortBy(items, { prop: "title", desc: true })
        break;
      case 4:
        _newItems = sortBy(items, { prop: "is_active", desc: true })
        break;
      default:
        _newItems = sortBy(items, { prop: "id", desc: true })
        break;
    }

    setActivityData({
      ...activityData,
      items: _newItems,
    })
  }, [activityData.items])

  return (
    <div role="detailActivity">
      <ActivityHeader
        setSelected={handleSetSelected}
        title={activityData?.title || "Loading..."}
        onClick={() => setAddTodoDialog(true)}
        onUpdate={() => setEditActivityDialog(true)}
        children={renderChildDialog()}
      />

      <Grid container spacing={3} alignItems="stretch">
        <TodoItems
          items={activityData.items}
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