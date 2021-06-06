import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios.post('/login', userData)
    .then(res => {
      setAuthHeader(res.data.token)
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      console.log(err.response.data)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios.post('/signup', userData)
    .then(res => {
      setAuthHeader(res.data.token)
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      console.log(err.response.data)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem('MNKToken')
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED })
  history.push('/login');
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios.get('/user').then(res => {
    dispatch({ type: SET_USER, payload: res.data })
  })
    .catch(err => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post('/user', userDetails)
  .then(() => {
    dispatch(getUserData());
  })
  .catch(err => console.log(err));
}

export const uploadImage = (formData) => dispatch => {
  console.log({formData})
  dispatch({ type: LOADING_USER })
  axios.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

const setAuthHeader = (token) => {
  const MNKToken = `Bearer ${token}`;
  localStorage.setItem('MNKToken', MNKToken)
  axios.defaults.headers.common['Authorization'] = MNKToken;
}