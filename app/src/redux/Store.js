import {createStore} from 'redux';
import comreduce from './Reducer';

export const store = createStore(comreduce);
