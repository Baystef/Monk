const functions = require("firebase-functions");
const express = require('express');

const FBAuth = require('./util/fbAuth');
const { getAllScreams, postScream } = require('./handlers/screams');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users');

const app = express();


// Screams
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postScream)

// User Routes
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)

// Auth Routes
app.post('/signup', signup)
app.post('/login', login)


exports.api = functions.https.onRequest(app);
