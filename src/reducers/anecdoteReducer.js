import anecdoteService from '../services/anecdotes';
/*
  State Model:
  {
    content: String
    id: String
    votes: Number
  }
*/

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  };
};

//const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state);
  //console.log('anecdoteReducer ::', action);
  switch (action.type) {
    case 'VOTE': {
      const updatedAnecdote = action.data;
      const id = updatedAnecdote.id;
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote);
    }
    case 'NEW_ANECDOTE': {
      return [...state, action.data];
    }
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const obj = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const updatedAnecdote = await anecdoteService.updateAnecdote(obj);
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const obj = asObject(content);
    const newAnecdote = await anecdoteService.createNewAnecdote(obj);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;
