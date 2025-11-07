export const ADD_APPLICATION = 'ADD_APPLICATION';
export const EDIT_APPLICATION = 'EDIT_APPLICATION';
export const DELETE_APPLICATION = 'DELETE_APPLICATION';

export const addApplication = (application) => ({
  type: ADD_APPLICATION,
  payload: application,
});

export const editApplication = (id, updatedApplication) => ({
  type: EDIT_APPLICATION,
  payload: { id, updatedApplication },
});

export const deleteApplication = (id) => ({
  type: DELETE_APPLICATION,
  payload: id,
});
