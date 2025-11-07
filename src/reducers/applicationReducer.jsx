import { ADD_APPLICATION, EDIT_APPLICATION, DELETE_APPLICATION } from '../actions/applicationActions';

const initialState = {
  applications: [],
};

const applicationReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_APPLICATION:
      return { ...state, applications: [...state.applications, action.payload] };
    case EDIT_APPLICATION:
      return {
        ...state,
        applications: state.applications.map(app =>
          app.id === action.payload.id ? { ...app, ...action.payload.updatedApplication } : app
        ),
      };
    case DELETE_APPLICATION:
      return {
        ...state,
        applications: state.applications.filter(app => app.id !== action.payload),
      };
    default:
      return state;
  }
};

export default applicationReducer;
