import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// initialize admin
admin.initializeApp();

/**
 * A Firestore HTTP function to create a new chatroom
 */
export const createChatRoom = functions.https.onRequest((request, response) => {
  const {
    body: { id: roomId, owner, themeColor }
  } = request;

  const roomRef = admin
    .firestore()
    .collection('rooms')
    .doc(roomId);

  roomRef
    .set({
      owner,
      themeColor,
      created: Date.now()
    })
    .then(() => {
      response.status(201).send({ success: true });
    })
    .catch(error => {
      response.status(500).send(error);
    });
});
