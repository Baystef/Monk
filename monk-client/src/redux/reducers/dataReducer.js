import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM } from '../types';

const initialState = {
  scream: [],
  screams: [],
  loading: false
}

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }

    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      }

    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
      state.screams[index] = action.payload;
      return {
        ...state,
        scream: action.payload,
        loading: false
      }

    case DELETE_SCREAM:
      index = state.screams.findIndex(scream => scream.screamId === action.payload)
      state.screams.splice(index, 1);
      return {
        ...state
      }

    default:
      return state;
  }
}