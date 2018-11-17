import * as types from '../types';

const initialState = {
  loading: false,
  ads: [],
  selectedAd: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LAST_AD:

      break;
    case types.ALL_ADS:      
      return {
        ...state,
        ads: payload
      };
    default:
      return state;
  }
}
