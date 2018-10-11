"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// initialize admin
admin.initializeApp();
exports.createChatRoom = functions.https.onRequest((request, response) => {
    const { body: { id: roomId, themeColor } } = request;
    const roomRef = admin
        .firestore()
        .collection('rooms')
        .doc(roomId);
    roomRef
        .set({
        themeColor,
        created: Date.now()
    })
        .then(snapshot => {
        response.status(201).send(snapshot);
    })
        .catch(error => {
        response.status(500).send(error);
    });
});
//# sourceMappingURL=index.js.map