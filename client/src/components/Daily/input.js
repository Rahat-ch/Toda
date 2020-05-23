import React, { useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import { createTodo } from '../../apiRequests/items';

const Input = () => {
  const [todo, setTodo] = useState("");
  const [mutate] = useMutation(createTodo, {
    onSuccess: () => {
      queryCache.refetchQueries('todos')
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ description: todo, segment: 'daily' })
    setTodo("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          placeholder="What do you need to do today?"
          onChange={e => setTodo(e.target.value)}
          value={todo}
        />
      </label>
      <input type="submit" value="+" />
    </form>
  )
}

export default Input;
