import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as firebaseHelper from 'firebase-functions-helper'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

const app = express()
const main = express()

const userCollection = 'users'

main.use(cors({ origin: true }))

main.use('/api/v1', app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({ extended: false }))

export const webApi = functions.https.onRequest(main)

app.post('/users', (req, res) => {
  firebaseHelper.firestore
    .createNewDocument(db, userCollection, req.body)
  res.send('Create a new User')
})

app.get('/users/:userId', (req, res) => {
  firebaseHelper.firestore
    .getNewDocument(db, userCollection, req.params.userId)
    .then(doc => res.status(200).json(doc))
})

app.get('/users', (req, res) => {
  firebaseHelper.firestore
    .backup(db, userCollection)
    .then(doc => res.status(200).json(doc))
})

app.patch('/users/:userId', (req, res) => {
  firebaseHelper.firestore
    .updateDocument(db, userCollection, req.params.userId, req.body)
  res.send('Updated a user')
})

app.delete('/users/:userId', (req, res) => {
  firebaseHelper.firestore
    .deleteDocument(db, userCollection, req.params.userId)
  res.send('Deleted a user')
})

