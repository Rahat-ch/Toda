import React, { useRef } from 'react'
import { useMutation, queryCache } from 'react-query';
import { updateTodo } from '../../apiRequests/items'

const DoneButton = ({ id, done }) => {
  const [mutate] = useMutation(updateTodo, {
    onSuccess: () => {
      queryCache.refetchQueries('todos')
    }
  });
  const handleUpdate = (e) => {
    e.preventDefault();
    mutate({ id, body: { done: !done } })
  }
  return (
    <input checked={done} type="checkbox" name="itemStatus" onChange={(e) => handleUpdate(e)} />
  )
}

export default DoneButton;
