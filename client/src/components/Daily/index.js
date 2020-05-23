import React from 'react';
import Input from './input';
import Todos from './todos';

const Daily = () => {
  return (
    <>
      <h3>Add tasks for today</h3>
      <Input />
      <Todos />
    </>
  )
};

export default Daily;
