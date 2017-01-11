import should from 'should'
import { getFirebase } from './firebase'

describe('Unauthenticated firebase', () => {
  let fb

  before(() => {
    fb = getFirebase(undefined, 'customName')
  })

  it('does not allow fetch user', (done) => {
    fb
      .then((firebase) => {
        firebase.database().ref('user').once('value')
          .then((sn) => {
            done(new Error('should not fetch user'))
          })
          .catch((error) => {
            done()
          })
      })
  })
})

