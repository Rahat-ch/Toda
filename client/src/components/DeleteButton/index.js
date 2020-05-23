import React from 'react';
import { useMutation, queryCache } from 'react-query';
import { deleteTodo } from '../../apiRequests/items'

const DeleteButton = ({ id, done }) => {
  const [mutate] = useMutation(deleteTodo, {
    onSuccess: () => {
      queryCache.refetchQueries('todos')
    }
  });
  const handleDelete = (e) => {
    e.preventDefault();
    mutate({ id })
  }
  return (
    <>
      {done ? <button disabled>❌</button> : <button onClick={(e) => handleDelete(e)}>❌</button>}
    </>
  )
}

export default DeleteButton;
