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
    const { body: { id: roomId, owner, themeColor } } = request;
    const roomRef = admin
        .firestore()
        .collection('rooms')
        .doc(roomId);
    roomRef
        .set({
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
//# sourceMappingURL=index.js.map