import { createStore } from 'redux';
import { Reducer } from '../reducers/index';

let initialValues = {
    data: []
};


export let store = createStore(Reducer, initialValues);
