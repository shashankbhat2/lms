const functions = require("firebase-functions");
const admin =  require('firebase-admin');
admin.initializeApp(functions.config().firebase)

const createNotification = ((notification) => {
    return admin.firestore().collection('notifications')
      .add(notification)
      .then(doc => console.log('notification added', doc));
  });
  

exports.newNotificationAdded = functions
    .firestore
    .document('adminnotifications/{adminnotificationId}')
    .onCreate(
    doc =>{
        const newNotification = doc.data();
        return createNotification(newNotification) 
    }
)