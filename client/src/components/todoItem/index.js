import React from 'react';
import DeleteButton from '../DeleteButton';
import DoneButton from '../DoneButton';
import classNames from 'classnames';
import './todoItem.css';

const TodoItem = ({ description, id, done }) => {
  const descriptionClass = classNames({
    'itemDone': done,
    'itemPending': !done,
  })
  return (
    <div className='itemContainer'>
      <DoneButton id={id} done={done} />
      <p className={descriptionClass}>{description}</p>
      <DeleteButton id={id} done={done} />
    </div>
  )
}

export default TodoItem;
