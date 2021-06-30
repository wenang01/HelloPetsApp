import {combineReducers} from 'redux';

// inisialisai var/param  (State Global)
const initialStateLogin = {
  email: '',
  password: '',
};

// function to action
const LoginReducer = (state = initialStateLogin, action) => {
  if (action.type === 'SET_LOGIN') {
    return {
      ...state,
      [action.input]: action.payload,
    };
  }
  return state;
};

// function combine reducer
const comreduce = combineReducers({
  LoginReducer,
});

export default comreduce;
