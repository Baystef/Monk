const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { db, admin } = require('../util/admin');
const { firebase, firebaseConfig } = require('../firebase-config');
const { validateSignupData, validateLoginData, reduceUserDetails } = require('../util/validators');

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  const { valid, errors } = validateSignupData(newUser)

  if (!valid) return res.status(400).json(errors);

  const blankAvatar = 'blank-avatar.png';

  let token, userId;
  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'Handle is already taken' })
      } else {
        return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken()
          })
          .then(idToken => {
            token = idToken;
            const userCred = {
              handle: newUser.handle,
              email: newUser.email,
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${blankAvatar}?alt=media`,
              createdAt: new Date().toISOString(),
              userId
            };
            return db.doc(`/users/${newUser.handle}`).set(userCred);
          })
          .then(() => {
            return res.status(201).json({ token });
          })
          .catch(err => {
            console.error(err)
            if (err.code === "auth/email-already-in-use") {
              return res.status(400).json({ email: 'Email is already in use' });
            }
            return res.status(500).json({ general: 'Something went wrong, please try again' })
          })
      }
    })
}

exports.login = (req, res) => {
  const { email, password } = req.body;

  const { valid, errors } = validateLoginData({ email, password })

  if (!valid) return res.status(400).json(errors);

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => data.user.getIdToken())
    .then(token => res.json({ token }))
    .catch(err => {
      console.error(err);
      if (err.code === "auth/wrong-password") return res.status(403).json({ general: 'Invalid credentials. Please try again' })
      return res.status(500).json({ error: err.code })
    });
}

exports.getUserDetails = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.params.handle}`).get().then(doc => {
    if (doc.exists) {
      userData.user = doc.data();
      return db.collection('screams').where('userHandle', '==', req.params.handle)
      .orderBy('createdAt', 'desc').get();
    } else {
      return res.status(404).json({ error: 'User not found' })
    }
  })
  .then(data => {
    userData.screams =[];
    data.forEach(doc => {
      userData.screams.push({
        body: doc.data().body,
        createdAt: doc.data().createdAt,
        userHandle: doc.data().userHandle,
        userImage: doc.data().userImage,
        likeCount: doc.data().likeCount,
        commentCount: doc.data().commentCount,
        streamId: doc.id,
      })
    });
    return res.json(userData);
  })
  .catch(err => {
    console.error(err);
    return res.status(500).json({ error: err.code })
  })
}

exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.handle}`).get().then(doc => {
    if (doc.exists) {
      userData.credentials = doc.data();
      return db.collection('likes').where('userHandle', '==', req.user.handle).get()
    }
  })
    .then(data => {
      userData.likes = [];
      data.forEach(doc => {
        userData.likes.push(doc.data());
      });
      return db.collection('notifications').where('recipient', '==', req.user.handle)
        .orderBy('createdAt', 'desc').limit(10).get()
      })
      .then(data => {
        userData.notifications = [];
      data.forEach(doc => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          type: doc.data().type,
          read: doc.data().read,
          notifications: doc.id,
        })
      })
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code })
    })
}

exports.addUserDetails = (req, res) => {
  let userDets = reduceUserDetails(req.body);
  db.doc(`/users/${req.user.handle}`).update(userDets)
    .then(() => {
      return res.json({ message: 'Details added successfully' });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code })
    })
}

exports.uploadImage = (req, res) => {
  const busboy = new Busboy({ headers: req.headers });
  let imageFileName, imageToBeUploaded = {};
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type. Upload either jpeg or png' })
    }
    const imageExt = filename.split('.')[filename.split('.').length - 1];
    imageFileName = `${Math.round(Math.random() * 100000000000)}.${imageExt}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  })
  busboy.on('finish', () => {
    admin.storage().bucket().upload(imageToBeUploaded.filepath, {
      resumable: false,
      metadata: {
        metadata: {
          contentType: imageToBeUploaded.mimetype
        }
      }
    })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => res.json({ message: 'Image uploaded successfully' }))
      .catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code })
      })
  })
  busboy.end(req.rawBody)
}

exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach(notifId => {
    const notification = db.doc(`/notifications/${notifId}`);
    batch.update(notification, { read: true });
  });
  batch.commit().then(() => {
    return res.json({ message: 'Notifications marked read' });
  })
  .catch(err => {
    console.error(err);
    return res.status(500).json({ err: err.code })
  })
}
