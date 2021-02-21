const functions = require("firebase-functions");
const express = require('express');

const FBAuth = require('./util/fbAuth');
const { getAllScreams, postScream, getScream, commentOnScream, likeScream, unlikeScream, deleteScream } = require('./handlers/screams');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users');

const app = express();


// Screams
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postScream)
app.get('/scream/:screamId', getScream);
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);
app.get('/scream/:screamId/like', FBAuth, likeScream);
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);
app.delete('/scream/:screamId', FBAuth, deleteScream)

// User Routes
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)

// Auth Routes
app.post('/signup', signup)
app.post('/login', login)


exports.api = functions.https.onRequest(app);
