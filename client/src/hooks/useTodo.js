import { createTodo } from '../apiRequests/items';
import { useMutation, queryCache } from 'react-query';
import { useState } from 'react';

function useTodo(todo) {
  const [success, setSuccess] = useState(false)
  const [mutate] = useMutation(createTodo, {
    onSuccess: () => {
      queryCache.refetchQueries('todos')
      setSuccess(true)
    }
  });
  mutate({ description: todo, segment: 'daily' });
  return [success]
}

export default useTodo;
