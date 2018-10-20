import * as types from '../types';

const initialState = {
  loading: false,
  users: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.USER_LOADING:
      return {
        ...state,
        loading: payload
      }
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        users: Object.values(payload),
        loading: false
      }
    default:
      return state;
  }
}
