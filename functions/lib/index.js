"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// initialize admin
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });
/**
 * A Firestore HTTP function to create a new chatroom
 */
exports.createChatRoom = functions.https.onRequest((request, response) => {
    const { body: { name, owner, themeColor } } = request;
    const roomRef = db.collection('rooms');
    roomRef
        .add({
        created: admin.firestore.FieldValue.serverTimestamp(),
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
 * Add a new message to the chatroom's message queue
 */
exports.addMessageToChatRoom = functions.https.onRequest((request, response) => {
    const { body: { roomId, from, text } } = request;
    const roomMessagesRef = db
        .collection('rooms')
        .doc(roomId)
        .collection('messages');
    roomMessagesRef
        .add({
        created: admin.firestore.FieldValue.serverTimestamp(),
        text,
        from
    })
        .then(() => {
        response.status(201).send({ success: true });
    })
        .catch(error => {
        response.status(500).send(error);
    });
});
/**
 * Retrieve chatrooms from the Firestore
 */
exports.getChatRooms = functions.https.onRequest((request, response) => {
    const rooms = db
        .collection('rooms')
        .orderBy('created', 'desc')
        .get();
    rooms
        .then(querySnapshot => {
        const roomsData = querySnapshot.docs.map(docSnapshot => (Object.assign({ id: docSnapshot.id }, docSnapshot.data())));
        response.status(201).send(roomsData);
    })
        .catch(error => {
        response.status(500).send(error);
    });
});
/**
 * Retreuve all the messages from the current chatroom
 */
exports.getChatRoomMessages = functions.https.onRequest((request, response) => {
    const { body: { roomId } } = request;
    const chatRoomMessages = db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('created', 'asc')
        .get();
    chatRoomMessages
        .then(querySnapshot => {
        const messages = querySnapshot.docs.map(messageSnapshot => (Object.assign({}, messageSnapshot.data(), { id: messageSnapshot.id, created: messageSnapshot.data().created.toDate() })));
        response.status(201).send(messages);
    })
        .catch(error => {
        response.status(500).send(error);
    });
});
//# sourceMappingURL=index.js.map