import * as types from '../types';

const initialState = {
  loading: false,
  ads: null,
  selectedAd: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
