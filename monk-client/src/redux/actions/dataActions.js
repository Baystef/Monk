import { 
  SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, 
  UNLIKE_SCREAM, LOADING_UI, POST_SCREAM, 
  DELETE_SCREAM, SET_ERRORS, CLEAR_ERRORS, 
  SET_SCREAM, STOP_LOADING_UI 
 } from '../types';
import axios from 'axios';

export const getAllScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios.get('/screams')
    .then(res => {
      dispatch({ type: SET_SCREAMS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: SET_SCREAMS, payload: [] })
    })
}

export const likeScream = (screamId) => dispatch => {
  axios.get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({ type: LIKE_SCREAM, payload: res.data })
    })
    .catch(err => console.log(err));
}

export const unlikeScream = (screamId) => dispatch => {
  axios.get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({ type: UNLIKE_SCREAM, payload: res.data })
    })
    .catch(err => console.log(err));
}

export const postScream = (newScream, reset) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios.post('/scream', newScream)
    .then(res => {
      console.log(res.data)
      dispatch({ type: POST_SCREAM, payload: res.data })
      dispatch({ type: CLEAR_ERRORS })
      dispatch(reset())
    })
    .catch(err => dispatch({ type: SET_ERRORS, payload: err?.response?.data }))
}

export const getScream = (screamId) => dispatch => {
  dispatch({ type: LOADING_UI })
  axios.get(`/scream/${screamId}`)
  .then(res => {
    dispatch({
      type: SET_SCREAM,
      payload: res.data
    })
    dispatch({ type: STOP_LOADING_UI })
  })
  .catch(e => console.log(e))
}

export const deleteScream = (screamId, cancel) => dispatch => {
  axios.delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId })
      cancel();
    })
    .catch(err => console.log(err));
}

export const clearErrors = () => dispatch => dispatch({ type: CLEAR_ERRORS })