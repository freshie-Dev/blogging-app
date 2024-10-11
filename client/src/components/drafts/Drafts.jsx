import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box'
import { fetchDrafts } from '../../slices/blog/blogSlice'
import { setEditor } from '../../slices/editor/editorSlice'
import { sortByDate } from '../../slices/blog/blogSlice';

import LogoutModal from '../Modals/logoutModal';

const Drafts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { drafts, loading, error } = useSelector(state => state.blog)
  const [openModal, setOpenModal] = useState(false);

  const openInEditor = (draft) => {
    dispatch(setEditor(draft))
    navigate('/blog')
  }

  useEffect(() => {
    const getDrafts = async () => {
      await dispatch(fetchDrafts());
    }
    getDrafts()
  }, [])

  useEffect(() => {
    // Automatically open modal if there's an error
    if (error) {
      setOpenModal(true);
    }
  }, [error])

  if (loading) return <h1>Loaading...</h1>
  if (error) return (
    <div>
      {error && (
        <LogoutModal
          open={openModal}
          setOpen={setOpenModal}
          title="Session Expired!"
          errorMessage="Please login again to continue." // Pass error message to the modal
        />
      )}
    </div>
  )
  return (
    <div>
      <select name="" id="">
        <option value="recent" onClick={() => dispatch(sortByDate({ type: "drafts", sortBy: "recent" }))}>Recent</option>
        <option value="oldest" onClick={() => dispatch(sortByDate({ type: "drafts", sortBy: "oldest" }))}>Oldest</option>
      </select>
      {drafts.map(draft => {
        return (
          <div key={draft._id}>
            <h1>{draft.title}</h1>
            <p>{JSON.stringify(draft)}</p>
            <Box component="button" onClick={() => openInEditor(draft)}>Edit</Box>
          </div>
        )
      })}
    </div>
  )
}

export default Drafts