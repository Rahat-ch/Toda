import React from 'react';
import { useQuery } from 'react-query';
import { getTodos } from '../../apiRequests/items';
import useAuth from '../../hooks/useAuth';
import TodoItem from '../todoItem'

const Todos = () => {
  const [user] = useAuth();
  const { data, status } = useQuery(user && ['todos', user._id], getTodos);
  if (status === 'loading') return <p>loading...</p>
  console.log(data)
  return (
    <>
      {data && data.data.map(todo => <TodoItem description={todo.description} id={todo._id} done={todo.done} />)}
    </>
  )
}

export default Todos;
