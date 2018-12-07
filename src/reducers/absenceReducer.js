import * as types from '../types';

const initialState = {
  loading: false,
  absences: [],
  documentSelected: ''
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_DOCUMENT_URL:
      return {
        ...state,
        loading: false,
        documentSelected: payload
      }
    case types.LOADING_ABSENCE:
      return {
        ...state,
        loading: payload
      }
    case types.FETCH_ALL_ABSENCE:
    // console.log(payload);
      return {
        ...state,
        absences: payload,
        loading: false
      };
    default:
      return state;
  }
}
