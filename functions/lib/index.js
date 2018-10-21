"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// initialize admin
admin.initializeApp();
/**
 * A Firestore HTTP function to create a new chatroom
 */
exports.createChatRoom = functions.https.onRequest((request, response) => {
    const { body: { name, owner, themeColor } } = request;
    const roomRef = admin.firestore().collection('rooms');
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
 * Retrieve chatrooms from the Firestore
 */
exports.getChatRooms = functions.https.onRequest((request, response) => {
    const rooms = admin
        .firestore()
        .collection('rooms')
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
//# sourceMappingURL=index.js.map