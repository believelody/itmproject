import * as types from '../types';

const initialState = {
  loading: false,
  ads: [],
  selectedAd: null,
  errors: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AD_ERRORS:
    console.log(payload);
      return {
        ...state,
        errors: [...state.errors, payload],
        loading: false
      }
    case types.AD_LOADING:
      return {
        ...state,
        loading: payload
      };
    case types.ALL_ADS:
      return {
        ...state,
        ads: payload,
        loading: false
      };
    default:
      return state;
  }
}
