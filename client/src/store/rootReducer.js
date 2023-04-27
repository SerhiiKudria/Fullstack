import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import taskReducer from './slices/taskSlice';

const rootReducer = combineReducers({
  usersData: usersReducer,
  tasksData: taskReducer,
});

export default rootReducer;
