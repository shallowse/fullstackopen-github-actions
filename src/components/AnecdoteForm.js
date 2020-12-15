import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content === '') {
      return;
    }
    event.target.anecdote.value = '';
    dispatch(createNewAnecdote(content));
    dispatch(setNotification(`you created '${content}'`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <input id='anecdote__input' name='anecdote' />{' '}
        <button id='anecdote__button' type='submit'>create</button>
      </form>
    </div>
  );
};
export default AnecdoteForm;
