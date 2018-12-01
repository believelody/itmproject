import * as types from '../types';

const initialState = {
  loading: false,
  ads: [],
  selectedAd: null,
  errors: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CLEAR_AD_FAILURE:
      return {
        ...state,
        errors: []
      };
    case types.CLEAR_SELECTED_AD:
      return {
        ...state,
        selectedAd: null
      };
    case types.SELECTED_AD:
      return {
        ...state,
        selectedAd: payload,
        loading: false
      }
    case types.AD_ERRORS:
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
