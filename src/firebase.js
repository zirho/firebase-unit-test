import firebase from 'firebase'
import config from './firebase.config'

firebase.initializeApp(config);

export default firebase

export const getFirebase =
  (customConfig = config, customName = '[default]') => {
    const cFirebase = firebase.initializeApp(customConfig, customName)
    return Promise.resolve(cFirebase.database())
  }
