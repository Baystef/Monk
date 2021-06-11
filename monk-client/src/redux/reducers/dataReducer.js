import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT } from '../types';

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

    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
        loading: false
      }

    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      }

    case POST_SCREAM:
      return {
        ...state,
        screams: [
          action.payload, ...state.screams
        ],
      }

    case DELETE_SCREAM:
      let idx = state.screams.findIndex(scream => scream.screamId === action.payload)
      state.screams.splice(idx, 1);
      return {
        ...state
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

      case SUBMIT_COMMENT:
        return {
          ...state,
          scream: {
            ...state.scream,
            comments: [action.payload, ...state.scream.comments]
          },
        loading: false
        }

    default:
      return state;
  }
}