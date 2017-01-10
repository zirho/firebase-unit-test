import firebase from './firebase'
import config from './firebase.config'

const admin = require("firebase-admin")
admin.initializeApp({
  credential: admin.credential.cert("./firebase-admin.json"),
  databaseURL: config.databaseURL
})

export const authWithUid = (uid) => {
  if (firebase.auth().currentUser) {
    // already inited and authenticated
    return Promise.resolve(firebase)
  }
  return admin.auth().createCustomToken(uid)
    .then((id_token) => {
      const auth = firebase.auth()
      return new Promise((resolve, reject) => {
        auth.signInWithCustomToken(id_token)
          .then(() => {
            resolve(firebase)
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
}
