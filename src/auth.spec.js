import should from 'should'
import { authWithUid } from './firebase.admin'

describe('Authenticated firebase', () => {
  let authedFirebase
  const UID = 'vl7GjxgIRre1sD0fNISAdqiDPFw1'

  before(() => {
    authedFirebase = authWithUid(UID)
  })

  it('allow authenticated user to fetch', (done) => {
    authedFirebase
      .then((firebase) => {
        const database = firebase.database()
        database.ref(`user`).once('value')
          .then((sn) => {
            should.strictEqual(sn.val(), 'joshua')
            done()
          })
          .catch((error) => {
            done(error)
          })
      })
  })
})

