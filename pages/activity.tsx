import React, { useState, useCallback, useEffect, useRef } from "react"
import ActivityCard from "../components/activity-card"
import ActivityHeader from "../components/activity-header"
import Loading from "../components/loading"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import EmptyItems from "../components/empty-items";
import { get, remove } from '../api/API'
import { ACTIVITY_GROUPS } from '../constant/api'
import { parseDate } from "../utils/utils";
import AlertNotification from "../components/alert-notification";
import ConfirmPopup from '../components/confirm-popup'
import ActivityPopup from "../components/activity-popup";

const confirmMessage = "Apakah Anda yakin ingin menghapus activity"

const useStyles = makeStyles(({}))

const Activity = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [openActivityDialog, setOpenActivityDialog] = useState(false);
  const [openConfirmPopup, setOpenConfirmPopup] = useState(false)
  const [visibleAlert, setVisibleAlert] = useState(false)

  const activityRef = useRef({
    id: "",
    title: "",
  })

  const fetchData = () => {
    const url = ACTIVITY_GROUPS + '?email=notfound@gmail.com'

    const onFetch = async () => {
      try {
        const responses = await get(url)
        setData(responses?.data)
        setLoading(false)
      } catch (error) {
        setLoading(true)
      }
    }

    onFetch()
  }

  useEffect(fetchData, []);

  const handleDelete = (id: string, title: string,) => {
    setOpenConfirmPopup(true)
    activityRef.current = {
      id,
      title
    }
  }

  const confirmDelete = useCallback(() => {
    const { id } = activityRef.current

    const url = ACTIVITY_GROUPS + `/${id}`
    setVisibleAlert(true)

    const onDelete = async () => {
      setLoading(true)

      try {
        await remove(url)
        fetchData()
      } catch (error) {
        console.error(error)
      } finally {
        setOpenConfirmPopup(false)
      }
    }

    onDelete()
  }, [fetchData])

  const renderActivityItems = useCallback(() => {
    if (loading) return <Loading />

    if (!data.length) return (
      <EmptyItems path="activity-empty-state.png" />
    )

    return data.map((item, index) =>
      <Grid item xs={12} sm={3} key={`item-${item.id}-${index}`}>
        <ActivityCard
          id={item?.id}
          title={item?.title}
          date={parseDate(item?.created_at)}
          onDelete={() => handleDelete(item?.id, item?.title)}
        />
      </Grid>
    )
  }, [data, loading])

  return (
    <div role="activity">
      <ActivityHeader 
        title="Activity"
        onClick={() => setOpenActivityDialog(true)}
        children={
          <ActivityPopup
            type="add"
            title="Tambah Activity"
            initialValues={{ activityName: ''}}
            openDialog={openActivityDialog}
            setOpenDialog={setOpenActivityDialog}
            onRefetch={fetchData}
         />}
      />

      <Grid container spacing={3} alignItems="stretch">
        {renderActivityItems()}
      </Grid>

      <ConfirmPopup
        open={openConfirmPopup}
        setOpen={setOpenConfirmPopup}
        message={`${confirmMessage} <b>"${activityRef.current?.title}</b>"`}
        onSubmit={confirmDelete}
      />

      <AlertNotification
        visibleAlert={visibleAlert}
        setVisibleAlert={setVisibleAlert}
        title="Activity berhasil dihapus"
      />
    </div>
  )
}

export default Activity