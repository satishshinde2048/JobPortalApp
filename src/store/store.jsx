import { createStore, combineReducers } from 'redux';
import applicationReducer from "../reducers/applicationReducer";

const rootReducer = combineReducers({
  application: applicationReducer,
});

const store = createStore(rootReducer);

export default store;
