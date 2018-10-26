import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// initialize admin
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

/**
 * A Firestore HTTP function to create a new chatroom
 */
export const createChatRoom = functions.https.onRequest((request, response) => {
  const {
    body: { name, owner, themeColor }
  } = request;

  const roomRef = db.collection('rooms');

  roomRef
    .add({
      name,
      owner,
      themeColor
    })
    .then(() => {
      response.status(201).send({ success: true });
    })
    .catch(error => {
      response.status(500).send(error);
    });
});

/**
 *
 */
export const addMessageToChatRoom = functions.https.onRequest(
  (request, response) => {
    const {
      body: { roomId, from, messageText }
    } = request;

    const roomMessagesRef = db
      .collection('rooms')
      .doc(roomId)
      .collection('messages');

    roomMessagesRef
      .add({
        message: messageText,
        from
      })
      .then(() => {
        response.status(201).send({ success: true });
      })
      .catch(error => {
        response.status(500).send(error);
      });
  }
);

/**
 * Retrieve chatrooms from the Firestore
 */
export const getChatRooms = functions.https.onRequest((request, response) => {
  const rooms = db.collection('rooms').get();

  rooms
    .then(querySnapshot => {
      const roomsData = querySnapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      }));

      response.status(201).send(roomsData);
    })
    .catch(error => {
      response.status(500).send(error);
    });
});

/**
 * Retreuve all the messages from the current chatroom
 */
export const getChatRoomMessages = functions.https.onRequest(
  (request, response) => {
    const {
      body: { roomId }
    } = request;

    const chatRoomMessages = db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .get();

    chatRoomMessages
      .then(querySnapshot => {
        const messages = querySnapshot.docs.map(messageSnapshot => ({
          id: messageSnapshot.id,
          ...messageSnapshot.data()
        }));

        response.status(201).send(messages);
      })
      .catch(error => {
        response.status(500).send(error);
      });
  }
);
