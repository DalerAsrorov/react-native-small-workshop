# Firestore Functions Reference

## Making calls using curl

- Deploy new function locally

```shell
firebase serve --only functions
```

- A simple call to create a new chatRoom

```shell
url -X POST "http://localhost:5000/react-native-small-workshop/us-central1/createChatRoom" -H "Content-Type:application/json" --data '{"id":"roomA", "owner": "daler", "themeColor": "#ccc"}'
```
