const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
}

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(regEx)) return true;
  else return false;
}

exports.validateSignupData = (data) => {
  const errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty'
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address'
  }

  if (isEmpty(data.password)) errors.password = 'Must not be empty'
  if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match'
  if (isEmpty(data.handle)) errors.handle = 'Must not be empty';
    
  return {
    errors, valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.validateLoginData = ({ email, password }) => {
  const errors = {};

  if (isEmpty(email)) errors.email = 'Must not be empty';
  if (isEmpty(password)) errors.password = 'Must not be empty';

  return {
    errors, valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.reduceUserDetails = (data) => {
  let userDets = {};

  if (!isEmpty(data.bio.trim())) userDets.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    if(!isEmpty(data.website.trim().substring(0, 4)) !== 'http') {
      userDets.website = `http://${data.website.trim()}`;
    } else userDets.website = data.website;
  }
  if (!isEmpty(data.location.trim())) userDets.location = data.location;

  return userDets;
}