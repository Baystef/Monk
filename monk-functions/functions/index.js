const functions = require("firebase-functions");
const express = require('express');

const FBAuth = require('./util/fbAuth');
const { getAllScreams, postScream } = require('./handlers/screams');
const { signup, login, uploadImage } = require('./handlers/users');

const app = express();


// Screams
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postScream)

// Auth Routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)


exports.api = functions.https.onRequest(app);
